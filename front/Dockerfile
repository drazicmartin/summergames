FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Pre-generate the .svelte-kit folder
COPY . .
RUN npx svelte-kit sync
RUN npm run build
RUN ls -l /app
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
ENV ORIGIN=http://localhost
CMD [ "node", "build" ]