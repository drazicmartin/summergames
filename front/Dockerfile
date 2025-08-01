FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci --force
# Pre-generate the .svelte-kit folder
COPY . .
RUN npx svelte-kit sync
RUN npm run build
RUN npm prune --omit=dev --force

FROM node:18-alpine AS deployment
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
EXPOSE 3000
ENV NODE_ENV=production
ENV ORIGIN=https://app.summer-games.fr
CMD [ "node", "build/index.js" ]