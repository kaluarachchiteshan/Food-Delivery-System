# Crave Club: Food Delivery System

A food ordering web app with a React frontend, a Node/Express API and MongoDB Atlas, packaged with Docker.

## Run with Docker

```bash
cp .env.example .env    # then set JWT_SECRET and MONGO_URI
docker compose up -d --build
```

Open http://localhost:8081. To stop it, run `docker compose down`. Data is stored in MongoDB Atlas.

### MongoDB Atlas setup

1. Create a cluster and a database user with read and write access.
2. Under **Network Access**, add the IP address of the machine running Docker.
3. Copy the Node.js connection string into `MONGO_URI` in `.env`, with `/food-delivery` before the `?`.

## Architecture

| Service    | Image                                  | Exposed            | Role                                      |
| ---------- | -------------------------------------- | ------------------ | ----------------------------------------- |
| `frontend` | Nginx (unprivileged), multi-stage build | `8081` on the host | Serves the site, forwards `/api` to backend |
| `backend`  | Node 24 Alpine                         | Internal only      | Register and login API                    |

The frontend starts once the backend reports healthy, which requires a working connection to Atlas.

Useful commands:

```bash
docker compose ps
docker compose logs -f backend
```

## Run without Docker

Requires Node 22+. Set `MONGO_URI` in `BackEnd/.env` to your Atlas connection string.

```bash
cd BackEnd && cp .env.example .env && npm install && npm start
```

```bash
cd FrontEnd && npm install && npm run dev
```

The frontend runs on http://localhost:5173 and forwards `/api` to port 5000.

## Contributing

Work happens on `feature/*` branches merged into `develop` through pull requests. `main` only receives releases from `develop`. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Current limits

Sign up and login are real and stored in MongoDB Atlas. The menu, bag and checkout run in the browser only, so orders are not saved yet.
