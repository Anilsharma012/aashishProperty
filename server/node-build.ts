import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "./index";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct usage
const { app, server } = createServer();

const port = process.env.PORT || 3000;

const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

server.listen(port, () => {
  console.log(`✅ App + WebSocket listening on port ${port}`);
  console.log(`🌐 Frontend: http://localhost:${port}`);
  console.log(`📡 WS Endpoint: ws://localhost:${port}/ws/chat`);
});
