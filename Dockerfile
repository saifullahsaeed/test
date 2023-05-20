FROM node:14

WORKDIR /app

# Install required dependencies
RUN apt-get update && apt-get install -y libnss3

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["node", "whatsapp.js"]
