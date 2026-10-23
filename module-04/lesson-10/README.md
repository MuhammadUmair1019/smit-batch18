# Simple Gemini backend

This small Express server accepts a prompt from a frontend, sends it to Gemini, and returns the AI response. The API key stays on the server.

## Run it

1. Install Node.js, then run `npm install`.
2. Copy `.env.example` to `.env` and add your Gemini API key from Google AI Studio.
3. Run `npm start`.

The server runs at `http://localhost:3000`.

Open `index.html` in a browser to use the simple prompt page.

## Call it from your frontend

Send a `POST` request to `/api/generate` with JSON containing a `prompt`:

```js
const result = await fetch("http://localhost:3000/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "Explain APIs in simple words" }),
});

const data = await result.json();
console.log(data.response);
```

Successful response:

```json
{ "response": "...Gemini's answer..." }
```
