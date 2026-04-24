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
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1d',
      etag: true
    }));
  }

  // Handle SPA routing and index.html serving
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template;
      let indexPath;

      if (process.env.NODE_ENV !== 'production' && vite) {
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

startServer();
