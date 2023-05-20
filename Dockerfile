# Use an official Node.js LTS (Long Term Support) image as the base
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json /app/


RUN npm i

# Copy the remaining application files to the container
COPY . /app/

# Set the entry point command to run the application
CMD ["node", "whatsapp.js"]
