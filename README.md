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

## CI/CD with Jenkins

Jenkins runs in its own container, built from `jenkins/Dockerfile` with Node.js 24, the Docker CLI and the needed plugins. It uses the host's Docker engine to build images.

```bash
docker compose -f docker-compose.jenkins.yml up -d --build
```

Open http://localhost:8080 and finish the setup:

1. Get the unlock password:

   ```bash
   docker compose -f docker-compose.jenkins.yml exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```

2. Choose **Select plugins to install** → **None** (the plugins are already installed), then create your admin user.
3. Add two **Secret text** credentials under **Manage Jenkins → Credentials**, used only by the deploy stage: `mongo-uri` (the Atlas connection string) and `jwt-secret`.
4. Create a **Multibranch Pipeline** job with a **GitHub** branch source pointing to this repository. Jenkins finds the `Jenkinsfile` in each branch.

The `Jenkinsfile` pipeline:

| Stage | Runs on | What it does |
| --- | --- | --- |
| Checks | every branch | Frontend `npm ci`, lint and build, in parallel with the backend install and syntax check |
| Docker images build | every branch | `docker compose build` under the separate `food-delivery-ci` project |
| Deploy | `main` only | `docker compose up -d --build` with the credentials from step 3 |

To stop Jenkins, run `docker compose -f docker-compose.jenkins.yml down`. Jobs and settings stay in the `jenkins_home` volume.

## Contributing

Work happens on `feature/*` branches merged into `develop` through pull requests. `main` only receives releases from `develop`. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Current limits

Sign up and login are real and stored in MongoDB Atlas. The menu, bag and checkout run in the browser only, so orders are not saved yet.
