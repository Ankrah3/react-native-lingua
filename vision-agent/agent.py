import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import Header, HTTPException
from vision_agents.core import Agent, Runner, ServeOptions, User
from vision_agents.core.agents import AgentLauncher
from vision_agents.core.instructions import Instructions
from vision_agents.plugins import getstream, openai

load_dotenv()

AGENT_SHARED_SECRET = os.getenv("AGENT_SHARED_SECRET")


# Baseline, lesson-agnostic persona. `join_call()` below layers the selected
# lesson's goal/vocabulary/phrases/prompt on top of this once it reads them
# from the call's custom data (packed in by app/api/stream/call+api.ts).
INSTRUCTIONS = (
    "You are a friendly, encouraging AI language teacher for a language-learning app. "
    "You always speak English yourself, and you teach the student's selected language "
    "through English explanations - introduce target-language words and phrases slowly, "
    "translate them, and have the student repeat them back to you. "
    "Keep responses short (one or two sentences) and conversational."
)


def build_lesson_instructions(custom_data: dict) -> str:
    """Extends the baseline persona with the lesson packed into the call's
    custom data. Falls back to the baseline persona if the call has no
    lesson data (e.g. an ad-hoc `uv run agent.py run` session)."""
    goal = custom_data.get("goal")
    if not goal:
        return INSTRUCTIONS

    vocabulary = custom_data.get("vocabulary") or []
    phrases = custom_data.get("phrases") or []
    ai_teacher_prompt = custom_data.get("aiTeacherPrompt")

    vocab_lines = "\n".join(
        f"- {item.get('term')} = {item.get('translation')}" for item in vocabulary
    )
    phrase_lines = "\n".join(
        f"- {item.get('text')} = {item.get('translation')}" for item in phrases
    )

    sections = [
        INSTRUCTIONS,
        f"This lesson's goal: {goal}",
    ]
    if vocab_lines:
        sections.append(f"Vocabulary to teach:\n{vocab_lines}")
    if phrase_lines:
        sections.append(f"Example phrases to practice:\n{phrase_lines}")
    if ai_teacher_prompt:
        sections.append(ai_teacher_prompt)

    return "\n\n".join(sections)


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="AI Teacher", id="ai-teacher"),
        instructions=INSTRUCTIONS,
        # Realtime speech-to-speech LLM - lowest latency, no separate STT/TTS
        # needed. send_video=False keeps this teacher voice-only even if the
        # student's camera is on.
        llm=openai.Realtime(voice="marin", send_video=False),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    # The Expo backend already creates the lesson call (see app/api/stream/call+api.ts):
    # an "audio_room" call with this agent added as an "admin" member, so it can
    # publish audio immediately instead of going through audio_room's normal
    # speak-request flow. create_call() is idempotent and simply resolves to
    # that same call.
    call = await agent.create_call(call_type, call_id)

    # audio_room calls start in "backstage". The Expo backend already calls
    # goLive() when it creates the call, but that can race with (or precede)
    # this session starting, so make sure it's live before greeting the
    # student - a second call is a no-op.
    try:
        await call.go_live()
    except Exception as err:
        agent.logger.info("Skipping go_live() - call is likely already live: %s", err)

    agent.instructions = Instructions(
        input_text=build_lesson_instructions(call.custom_data or {})
    )

    async with agent.join(call):
        await agent.simple_response(
            text="Greet the student warmly in English, introduce yourself as "
            "their AI language teacher, mention today's lesson goal if you "
            "have one, and ask them to say hello back."
        )
        await agent.finish()


def check_shared_secret(
    call_id: str,
    x_agent_shared_secret: Optional[str] = Header(default=None),
) -> None:
    """Auth for the `serve` HTTP API - the Expo backend is the only caller
    (see lib/server/visionAgent.ts) and sends this shared secret on every
    request. Requires AGENT_SHARED_SECRET to be set; fails closed otherwise."""
    if not AGENT_SHARED_SECRET or x_agent_shared_secret != AGENT_SHARED_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")


runner = Runner(
    AgentLauncher(create_agent=create_agent, join_call=join_call),
    serve_options=ServeOptions(
        can_start_session=check_shared_secret,
        can_close_session=check_shared_secret,
    ),
)


if __name__ == "__main__":
    runner.cli()
