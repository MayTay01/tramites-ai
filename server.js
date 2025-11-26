import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(express.json());

// CORS CORREGIDO
app.use(cors({
    origin: "https://tramites-ai-bbmd.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "Eres un experto en trámites del gobierno de México. Responde claro y paso por paso." },
                { role: "user", content: userMessage }
            ]
        });

        res.json({ reply: completion.choices[0].message.content });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al conectarse a Groq." });
    }
});

app.listen(3000, () => {
    console.log("Servidor Groq listo en http://localhost:3000");
});


