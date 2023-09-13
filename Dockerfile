# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install your application's dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 3001

# Define the command to start your application
# Specify the entrypoint script
CMD ["./entrypoint.sh"]

