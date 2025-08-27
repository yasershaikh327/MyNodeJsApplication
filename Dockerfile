# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose port 3000 (or whatever your app uses)
EXPOSE 3000

# Run app
CMD ["node", "app.js"]
