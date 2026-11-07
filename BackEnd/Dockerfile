FROM node:24-alpine
ENV NODE_ENV=production
WORKDIR /app

# Install only production dependencies, from the lockfile, for repeatable builds
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# The official image ships an unprivileged "node" user
USER node
EXPOSE 5000
HEALTHCHECK --interval=15s --timeout=3s --start-period=20s --retries=5 \
  CMD wget -q --spider http://127.0.0.1:5000/api/health || exit 1

# Run node directly (not through npm) so it receives stop signals
CMD ["node", "server.js"]
