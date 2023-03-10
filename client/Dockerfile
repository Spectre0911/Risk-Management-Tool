# Use a Node.js runtime as the base image
FROM node:18.2

# Set the working directory to /client
WORKDIR /client

# Copy the package.json and package-lock.json files to the container
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code to the container
COPY client/ .

# Build the React app
#RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]