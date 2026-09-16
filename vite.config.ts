import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function profileUploadPlugin(): Plugin {
  return {
    name: 'profile-upload-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/upload-profile', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.image) {
                const matches = data.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                if (matches && matches[2]) {
                  const buffer = Buffer.from(matches[2], 'base64');
                  const publicDir = path.resolve(__dirname, 'public');
                  if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                  }
                  fs.writeFileSync(path.join(publicDir, 'profile.jpg'), buffer);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, url: '/profile.jpg' }));
                  return;
                }
              }
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid payload' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
        } else if (req.method === 'DELETE') {
          try {
            const p = path.resolve(__dirname, 'public/profile.jpg');
            if (fs.existsSync(p)) {
              fs.unlinkSync(p);
            }
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), profileUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
