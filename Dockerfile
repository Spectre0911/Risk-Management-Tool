# Base image
FROM node:16.13

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Set the command to run when the container starts
CMD ["npm", "start", "--prefix", "client"]