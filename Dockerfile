FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN chmod +x /app/fleet.ts

EXPOSE 3000
