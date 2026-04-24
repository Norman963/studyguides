import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  let vite;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware loaded');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
  }

  // Handle SPA routing and index.html serving
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    console.log(`Request: ${url}`);

    try {
      let template;
      let indexPath;

      if (process.env.NODE_ENV !== 'production') {
        indexPath = path.resolve(__dirname, 'index.html');
        template = await fs.readFile(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        indexPath = path.resolve(__dirname, 'dist', 'index.html');
        template = await fs.readFile(indexPath, 'utf-8');
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production' && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(`Error serving index.html: ${e.message}`);
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
