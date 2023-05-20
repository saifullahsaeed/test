# Use an official Node.js LTS (Long Term Support) image as the base
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json /app/

# Install the project dependencies
RUN npm ci --production

# Copy the remaining application files to the container
COPY . /app/

RUN npm i
RUN  apt install chromium
# Expose the port on which the application will run
EXPOSE 8080

# Set the entry point command to run the application
CMD ["node", "whatsapp.js"]
