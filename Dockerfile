FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache curl

ENV PORT=3000
ENV HOST=0.0.0.0

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 \
  CMD curl -sf "http://127.0.0.1:$${PORT:-3000}/health" || exit 1

CMD ["node", "index.js"]
