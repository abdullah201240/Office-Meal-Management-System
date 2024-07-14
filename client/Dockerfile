# Use the official Node.js image
FROM node:18.16.0

# Set working directory
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Build React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
