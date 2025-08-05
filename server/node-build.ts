import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer } from "./index"; // This should return { app, server }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Get port from env or default to 8080
const port = process.env.PORT || 3000;


// ✅ Get Express app and HTTP server (with WebSocket if used)
const { app, server } = createServer();

// ✅ Serve frontend from "spa" folder
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));

// ✅ Fallback for React Router
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Start server
server.listen(port, () => {
  console.log(`✅ App + WebSocket listening on port ${port}`);
  console.log(`🌐 Frontend: http://localhost:${port}`);
  console.log(`📡 WS Endpoint: ws://localhost:${port}/ws/chat`);
});
