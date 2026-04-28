import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  // Simple maps proxy to avoid exposing forge API keys in the frontend.
  // Usage: client -> /v1/maps/proxy/maps/api/js?{other_query}
  // The server will forward the request to the configured FORGE_BASE_URL
  // and attach the secret from process.env.FORGE_API_KEY.
  app.get("/v1/maps/proxy/maps/api/js", async (req, res) => {
    try {
      const FORGE_BASE_URL = process.env.FORGE_BASE_URL || "https://forge.butterfly-effect.dev";
      const FORGE_API_KEY = process.env.FORGE_API_KEY;
      if (!FORGE_API_KEY) {
        res.status(500).send("Server misconfigured: missing FORGE_API_KEY");
        return;
      }

      // Preserve any query string from the client, but do not trust a client-provided key.
      const clientQs = req.originalUrl.split("?")[1] || "";
      const upstreamUrl = `${FORGE_BASE_URL}/maps/api/js?key=${encodeURIComponent(FORGE_API_KEY)}${clientQs ? `&${clientQs}` : ""}`;

      const upstreamResp = await fetch(upstreamUrl);
      const contentType = upstreamResp.headers.get("content-type") || "application/javascript";
      const body = await upstreamResp.arrayBuffer();

      res.status(upstreamResp.status);
      res.set("content-type", contentType);
      res.send(Buffer.from(body));
    } catch (err) {
      console.error("maps proxy error", err);
      res.status(502).send("Failed to proxy maps script");
    }
  });

  // Handle client-side routing - serve index.html for all other routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
