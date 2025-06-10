FROM node:18 AS deps
WORKDIR /app
COPY package.json package-lock.json* ./ 
RUN npm install

# Build the app
FROM node:18 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image
FROM node:18 AS runner
WORKDIR /app

# Copy the built app from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
    
# Expose the port and run the app
EXPOSE 3000
CMD ["npm", "start"]