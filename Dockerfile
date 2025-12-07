# --- Build Stage ---
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# --- Run Stage ---
FROM node:18

WORKDIR /app

COPY --from=builder /app ./

ENV HOST=0.0.0.0
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
