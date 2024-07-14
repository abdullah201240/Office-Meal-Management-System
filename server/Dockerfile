# Use the official Node.js image
FROM node:18.16.0

# Set working directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the Express server
CMD ["npm", "start"]
