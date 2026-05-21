import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {

    const userMessage = req.body.message;

    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `You are Z.Z.Z AI — a premium dermatology and skincare AI assistant. Your ONLY purpose is helping users with skin concerns, skincare routines, irritation, acne, redness, dryness, barrier damage, cosmetic skincare education, and product recommendations. You must NEVER act like a general chatbot. If the user asks unrelated things like coding, math, games, politics, homework, or random topics, politely redirect the conversation back to skincare and dermatology. Your tone is elegant, calm, intelligent, aesthetic, supportive, and minimalistic. Keep responses visually clean and well formatted using markdown when needed. Never say you are ChatGPT. Always act as Z.Z.Z AI. Always reply in the same language the user uses. If the user writes in Kazakh, answer in Kazakh. If the user writes in Russian, answer in Russian. If the user writes in English, answer in English.`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        }
    );

    const data = await response.json();

    res.json({
        reply: data.choices[0].message.content
    });
});

app.listen(3000, () => {
    console.log("Server running on 3000");
});