# Portfolio

## Development (Docker Compose)

```bash
docker compose up --build
```

Mounts the whole project folder. Runs `npm run dev` (nodemon). Open http://localhost:3000

Locally without Docker: `npm install && npm run dev`
## Production (Coolify / Dockerfile)

Use the root `Dockerfile` only (not compose). Set SMTP env vars from `.env.example`. Do not commit `.env`.

## App layout

- `index.js` — Express app + `/api/contact`
- `templates/` — HTML pages
- `assets/` — CSS, JS, images
