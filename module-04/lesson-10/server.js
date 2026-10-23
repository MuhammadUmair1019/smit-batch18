import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      timeout: 60000,
      retryOptions: { attempts: 1 },
    },
  })
  : null;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", geminiConfigured: Boolean(ai) });
});

app.post("/api/generate", async (req, res) => {
  console.log("POST /api/generate received.");
  const { prompt } = req.body ?? {};

  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Please provide a prompt." });
  }

  if (!ai) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
  }

  try {
    console.log("Sending prompt to Gemini...");
    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt.trim(),
      config: {
        maxOutputTokens: 1024,
        systemInstruction: "Answer clearly and completely. Use Markdown headings, lists, and code formatting when they help readability.",
        thinkingConfig: { thinkingLevel: "low" },
      },
    });

    console.log("Gemini response received.");
    const response = result.text?.trim();
    if (!response) {
      console.error("Gemini returned no text:", result);
      return res.status(502).json({ error: "Gemini returned an empty response. Check the server terminal for details." });
    }

    return res.json({ response });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Gemini error.";
    console.error("Gemini request failed:", message);
    return res.status(502).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
