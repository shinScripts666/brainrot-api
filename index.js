import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// COLE SEU WEBHOOK DO DISCORD AQUI
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/SEU_WEBHOOK";

let lastSent = {};

app.post("/send", async (req, res) => {
    try {
        const payload = req.body;

        if (!payload || !payload.entries || payload.entries.length === 0) {
            return res.status(400).json({ error: "Nada para enviar" });
        }

        const key = payload.entries
            .map(e => `${e.displayName}|${e.rarity}|${e.value}`)
            .join(";");

        if (lastSent[key]) {
            return res.json({ status: "duplicado — ignorado" });
        }

        lastSent[key] = true;

        const embed = {
            title: "💎 Brainrot Detectado",
            description: payload.message,
            color: 0x00ff99,
            timestamp: new Date().toISOString(),
            footer: { text: `Server: ${payload.serverId}` }
        };

        await axios.post(DISCORD_WEBHOOK, { embeds: [embed] });

        res.json({ status: "enviado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API ativa na porta ${PORT}`));
