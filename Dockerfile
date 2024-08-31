# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application source code to the container
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port on which the app runs
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
