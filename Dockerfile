FROM node:20-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine

EXPOSE 3000

COPY --from=builder /app/dist /app/
COPY --from=builder /app/node_modules /app/node_modules

WORKDIR /app
CMD ["node", "index.js"]

