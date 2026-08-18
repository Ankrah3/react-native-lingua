# vision-agent

The AI language teacher - a voice-only [Vision Agents](https://visionagents.ai) service
that joins the same Stream call as the mobile app, using OpenAI's Realtime API for
speech-to-speech conversation. Scaffolded with `uvx vision-agents init`.

The Expo app creates an `audio_room` Stream call for each lesson (see
`app/api/stream/call+api.ts`) and packs the selected lesson's goal, vocabulary,
phrases, and AI teacher prompt into the call's custom data. `agent.py` reads
that data once it joins (`join_call()`) and teaches that specific lesson
instead of a generic conversation. The Expo app starts/stops this agent's
session by calling this service's `serve` HTTP API through
`app/api/agent/start+api.ts` / `stop+api.ts` - the mobile app itself never
talks to this service directly.

## Setup

1. Copy `.env.example` to `.env`.
   - `STREAM_API_KEY` / `STREAM_API_SECRET`: reuse the same values from the parent
     app's `.env` at the repo root (same Stream app, both sides talk to it).
   - `OPENAI_API_KEY`: your OpenAI key, used for the Realtime voice model.
   - `AGENT_SHARED_SECRET`: any random string. Copy the same value into the parent
     app's `.env` (`AGENT_SHARED_SECRET`) - the Expo backend sends it on every
     request to this service's `serve` API and requests without it are rejected.
2. Install dependencies:

   ```bash
   uv sync
   ```

3. Run the agent:

   ```bash
   uv run agent.py run     # single-call console
   uv run agent.py serve   # HTTP server - what the Expo backend talks to
   ```

   In local dev, also set `VISION_AGENT_BASE_URL=http://localhost:8000` (the
   default) in the parent app's `.env` so the Expo API routes can reach it.

4. Run the tests:

   ```bash
   uv run pytest
   ```

## Docker

```bash
docker build -t vision-agent .
docker run --env-file .env -p 8000:8000 vision-agent
```
