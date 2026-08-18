---
name: Agent
description: Use when building real-time voice and video AI agents, integrating with LLMs and speech services, deploying agents to production, adding function calling and RAG, or testing agent behavior. Agents handle call lifecycle, audio/video routing, turn-taking, and multi-provider integrations.
metadata:
    mintlify-proj: agent
    version: "1.0"
---

# Vision Agents Skill

## Product Summary

Vision Agents is an open-source Python framework for building real-time voice and video AI agents. Agents join video calls, connect to AI providers (LLM, STT, TTS, vision models) through swappable plugins, and respond in real time. The framework handles call lifecycle, audio/video routing, turn-taking, and deployment. Use it to build voice support bots, video coaches, phone agents with knowledge bases, and multimodal assistants.

**Key files and commands:**
- `agent.py` — Main agent definition with `create_agent()` and `join_call()` functions
- `pyproject.toml` — Project dependencies and entry point
- `.env` — API keys for providers (STREAM_API_KEY, GOOGLE_API_KEY, etc.)
- `uv run agent.py run` — Console mode (development)
- `uv run agent.py serve` — HTTP server mode (production)
- Primary docs: https://visionagents.ai

## When to Use

Reach for this skill when:
- **Building voice agents** — Custom STT/LLM/TTS pipelines or realtime models (OpenAI, Gemini, Qwen)
- **Adding phone integration** — Inbound/outbound calls via Twilio or Telnyx
- **Implementing function calling** — Register Python functions or MCP servers as tools
- **Adding RAG** — Gemini FileSearch or TurboPuffer for knowledge retrieval
- **Deploying to production** — Docker, Kubernetes, horizontal scaling with Redis
- **Testing agent behavior** — Pytest-based testing without audio/video infrastructure
- **Monitoring agents** — OpenTelemetry metrics, Prometheus, Jaeger tracing
- **Building video agents** — VLMs (vision language models) or YOLO processors for real-time video analysis

## Quick Reference

### Agent Modes

| Mode | Best For | Setup |
|------|----------|-------|
| **Realtime** | Lowest latency, simplest setup | `llm=gemini.Realtime()` — one provider handles speech in/out |
| **Custom Pipeline** | Full control, mix providers | `llm=gemini.LLM()`, `stt=deepgram.STT()`, `tts=elevenlabs.TTS()` |

### Core Components

| Component | Purpose | Example |
|-----------|---------|---------|
| `Agent` | Central orchestrator | `Agent(edge=..., llm=..., stt=..., tts=...)` |
| `Edge` | Transport layer | `getstream.Edge()` (default), `local.Edge()` (dev) |
| `LLM` | Language model | `openai.LLM()`, `gemini.LLM()`, `anthropic.LLM()` |
| `STT` | Speech-to-text | `deepgram.STT()`, `elevenlabs.STT()` |
| `TTS` | Text-to-speech | `elevenlabs.TTS()`, `cartesia.TTS()` |
| `Runner` | CLI entry point | `Runner(AgentLauncher(...))` |

### CLI Commands

```bash
# Development (console mode)
uv run agent.py run

# Production (HTTP server)
uv run agent.py serve --host 0.0.0.0 --port 8000

# With options
uv run agent.py run --call-id my-call --video-track-override=/path/to/video.mp4
uv run agent.py serve --agents-log-level DEBUG
```

### HTTP Server Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/calls/{call_id}/sessions` | Create agent session |
| DELETE | `/calls/{call_id}/sessions/{session_id}` | Close session |
| GET | `/calls/{call_id}/sessions/{session_id}/metrics` | Get performance metrics |
| GET | `/health` | Liveness check |
| GET | `/ready` | Readiness check |

### Environment Variables

```bash
# Stream (edge transport)
STREAM_API_KEY=...
STREAM_API_SECRET=...

# LLM providers
GOOGLE_API_KEY=...           # Gemini
OPENAI_API_KEY=...           # OpenAI
ANTHROPIC_API_KEY=...        # Anthropic

# Speech services
DEEPGRAM_API_KEY=...         # STT
ELEVENLABS_API_KEY=...       # TTS
CARTESIA_API_KEY=...         # TTS

# RAG
TURBOPUFFER_API_KEY=...      # Vector search
```

## Decision Guidance

### When to Use Realtime vs Custom Pipeline

| Scenario | Use Realtime | Use Custom Pipeline |
|----------|--------------|---------------------|
| Fastest path to working agent | ✓ | |
| Need lowest latency | ✓ | |
| Want to mix STT/LLM/TTS providers | | ✓ |
| Need function calling | | ✓ (realtime models have limited tool support) |
| Want control over turn detection | | ✓ |
| Prototyping quickly | ✓ | |

### When to Use Gemini FileSearch vs TurboPuffer for RAG

| Feature | Gemini FileSearch | TurboPuffer |
|---------|-------------------|-------------|
| Setup complexity | Simple | More setup |
| Chunking | Automatic | Configurable |
| Search type | Managed | Hybrid (vector + BM25) |
| Control | Less | Full |
| Cost | Included with Gemini | Separate service |
| Best for | Prototypes | Production with custom needs |

### Edge Transport Choice

| Transport | Best For | Setup |
|-----------|----------|-------|
| Stream Video RTC | Production, WebRTC, chat memory | Requires Stream account |
| Local | Development, camera/mic on machine | No account needed |
| Tencent RTC | Low latency in Asia | Tencent account |

## Workflow

### 1. Scaffold a New Agent

```bash
uvx vision-agents init my-agent && cd my-agent
```

This creates:
- `agent.py` — Agent definition
- `pyproject.toml` — Dependencies
- `.env.example` — Template for API keys
- `Dockerfile` — For containerization
- `tests/` — Test directory

### 2. Configure API Keys

Copy `.env.example` to `.env` and fill in required keys:

```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Define the Agent

Edit `agent.py`:

```python
from vision_agents.core import Agent, Runner, User
from vision_agents.plugins import getstream, gemini

async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Assistant", id="agent"),
        instructions="You're a helpful voice assistant.",
        llm=gemini.Realtime(),  # or custom pipeline
    )

async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)
    async with agent.join(call):
        await agent.simple_response("Say hi and introduce yourself.")
        await agent.finish()

runner = Runner(AgentLauncher(create_agent=create_agent, join_call=join_call))

if __name__ == "__main__":
    runner.cli()
```

### 4. Add Function Calling (Optional)

Register functions in `create_agent()`:

```python
llm = gemini.LLM()

@llm.register_function(description="Get weather for a location")
async def get_weather(location: str) -> dict:
    return {"temperature": "22C", "condition": "Sunny"}

agent = Agent(..., llm=llm)
```

### 5. Add RAG (Optional)

```python
from vision_agents.plugins import gemini

store = gemini.GeminiFilesearchRAG(name="my-knowledge-base")
await store.create()
await store.add_directory("./knowledge")

llm = gemini.LLM(
    model="gemini-3-flash-preview",
    tools=[gemini.tools.FileSearch(store)]
)
```

### 6. Test Locally

```bash
uv run agent.py run
```

Opens browser demo. Talk to your agent.

### 7. Deploy

**Docker:**
```bash
docker build -t my-agent .
docker run -e STREAM_API_KEY=... -e GOOGLE_API_KEY=... my-agent
```

**Kubernetes:**
See `guides/kubernetes-deployment` for Helm chart with Prometheus/Grafana.

### 8. Monitor

Export metrics to Prometheus:

```python
from vision_agents.core import telemetry

telemetry.setup_opentelemetry(
    service_name="my-agent",
    exporter_type="prometheus"
)
```

View at `http://localhost:9464/metrics`.

## Common Gotchas

- **Don't reuse Agent instances** — Create a new agent for each call. Calling `join()` twice raises `RuntimeError`.
- **Realtime models don't support separate STT/TTS** — When using `AudioLLM` (realtime), STT/TTS are automatically disabled. Don't configure them.
- **Turn detection conflicts** — Don't use turn detection with Realtime LLMs; they handle it internally. If STT has built-in turn detection (`stt.turn_detection=True`), don't add a separate `turn_detection` plugin.
- **Function registration must be async** — Synchronous functions raise `ValueError`. Use `async def`.
- **MCP servers connect on `join()`** — Tools aren't available until the agent joins a call.
- **Session limits matter** — Set `max_concurrent_sessions` and `max_session_duration_seconds` to prevent runaway costs.
- **Video override requires avatar or processor** — `set_video_track_override_path()` only works when `publish_video=True`.
- **Interruption handling needs tuning** — Lower `confidence_threshold` if agent doesn't stop when interrupted; raise it if it stops too easily.
- **Chat memory requires Stream Video** — Transcripts persist automatically only with Stream RTC transport. Use in-memory storage for local dev.
- **Tool timeout is 30 seconds** — Functions that take longer fail silently. Increase timeout if needed.

## Verification Checklist

Before submitting work:

- [ ] Agent scaffolded with `uvx vision-agents init`
- [ ] `.env` file created and all required API keys filled in
- [ ] `create_agent()` and `join_call()` functions defined
- [ ] Agent runs locally with `uv run agent.py run` without errors
- [ ] Agent responds to user input in browser demo
- [ ] If using function calling: functions are `async`, registered with `@llm.register_function()`
- [ ] If using RAG: knowledge base created and added with `add_directory()`
- [ ] If using phone: Twilio/Telnyx webhook configured and ngrok running
- [ ] If deploying: Dockerfile builds and runs with environment variables
- [ ] If scaling: Redis configured for session registry
- [ ] Tests pass with `uv run pytest tests/`
- [ ] Metrics exported and visible in Prometheus/Grafana (if production)

## Resources

**Comprehensive navigation:** https://visionagents.ai/llms.txt

**Critical documentation:**
1. [Quickstart](https://visionagents.ai/introduction/quickstart) — Build your first agent in 5 minutes
2. [Voice Agents](https://visionagents.ai/introduction/voice-agents) — Realtime vs custom pipeline, function calling, phone integration
3. [Deploying Overview](https://visionagents.ai/guides/deploying-overview) — Local dev → Docker → Kubernetes path

**Additional guides:**
- [HTTP Server](https://visionagents.ai/guides/http-server) — Session management, CORS, authentication
- [MCP & Function Calling](https://visionagents.ai/guides/mcp-tool-calling) — Register tools and MCP servers
- [RAG](https://visionagents.ai/guides/rag) — Gemini FileSearch and TurboPuffer
- [Testing](https://visionagents.ai/guides/testing) — Pytest-based agent testing
- [Telemetry](https://visionagents.ai/core/telemetry) — OpenTelemetry metrics and Prometheus

---

> For additional documentation and navigation, see: https://visionagents.ai/llms.txt