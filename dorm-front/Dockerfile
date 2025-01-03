# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve
FROM node:18-slim AS runner

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Install production dependencies
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
