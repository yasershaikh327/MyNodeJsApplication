FROM node:18

# Create working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app uses (change if your app uses another)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
