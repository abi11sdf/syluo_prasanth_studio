import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes (Simulating Microservices Logic)
  
  // 1. Assets Service (Simulated)
  app.get("/api/assets/:type", (req, res) => {
    const { type } = req.params;
    // In a real S3 scenario, this would generate signed URLs
    res.json({ 
      status: "success", 
      path: `cloud-storage/source/${type}/`,
      provider: "GCP/S3/Azure Support Ready"
    });
  });

  // 2. Payment Intent Service
  app.post("/api/payments/create-intent", async (req, res) => {
    const { amount, category } = req.body;
    // Mock Stripe flow
    console.log(`Creating payment intent for ${category}: ${amount}`);
    res.json({ 
      clientSecret: "pi_mock_secret_" + Date.now(),
      status: "requires_payment_method"
    });
  });

  // 3. Contact Service
  app.post("/api/contact", (req, res) => {
    console.log("Contact form received:", req.body);
    res.json({ success: true, message: "Thank you for reaching out to Prasanth Studio." });
  });

  // Vite Integration
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
    console.log(`Prasanth Studio Full-Stack running on http://localhost:${PORT}`);
    console.log(`Backend: Express + Node.js`);
    console.log(`Frontend: React + Vite`);
    console.log(`Ready for S3/GCP Integration`);
  });
}

startServer();
