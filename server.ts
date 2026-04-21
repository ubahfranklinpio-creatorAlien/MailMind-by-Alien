import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { fetchRecentEmails } from "./src/lib/imap";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/emails", async (req, res) => {
    const { user, password, host, port } = req.body;

    if (!user || !password) {
      return res.status(400).json({
        error: "Credentials Required",
        message: "Email and password are required to fetch emails."
      });
    }

    try {
      const emails = await fetchRecentEmails({
        user: user,
        password: password,
        host: host || "imap.gmail.com",
        port: port || 993,
      });

      res.json({ emails });
    } catch (error: any) {
      console.error("Error fetching emails:", error);
      res.status(500).json({
        error: "Connection Failed",
        message: "Failed to connect to the IMAP server. Please check your credentials.",
        details: error.message,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
