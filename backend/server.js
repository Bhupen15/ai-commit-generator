import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/generate-commit", async (req, res) => {
  try {
    const { diff } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
     {
  role: "system",
  content: "You are a senior software engineer. Write concise git commit messages using Conventional Commits format."
},
{
  role: "user",
  content: `
Generate ONE professional git commit message for the following changes.

Rules:
- Use conventional commit format (feat, fix, refactor, docs, chore).
- Write only ONE commit message.
- Keep it under 80 characters.
- Do not explain anything.

Changes:
${diff}
`
}
      ]
    });

    res.json({
      commit: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});