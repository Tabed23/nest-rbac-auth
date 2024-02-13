FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.3.0
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY .env ./
EXPOSE 8080
CMD ["npm", "run", "start:dev"]