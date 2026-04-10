# 1. Use a lightweight Node image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package files first (to use Docker cache for faster builds)
COPY package*.json ./
COPY prisma ./prisma/

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your code
COPY . .

# 6. Generate Prisma Client (Crucial for TypeScript + Database)
RUN npx prisma generate

# 7. Build the TypeScript code into JavaScript
RUN npm run build

# 8. Open the port your Fastify app runs on
EXPOSE 3000

# 9. Start the server
CMD ["npm", "start"]