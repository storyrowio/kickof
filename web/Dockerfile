# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000
ENV NEXT_PUBLIC_APP_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=https://kickof-server.onrender.com/api
ENV API_URL=https://kickof-server.onrender.com/api

RUN echo "Build time environment development:"
RUN printenv | grep NEXT_PUBLIC_API_URL

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_APP_URL=https://kickof-web.onrender.com
ENV NEXT_PUBLIC_API_URL=https://kickof-server.onrender.com/api
ENV API_URL=https://kickof-server.onrender.com/api

RUN echo "Build time environment production:"
RUN printenv | grep NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
