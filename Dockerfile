FROM node:24-alpine 

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm install -g pm2

COPY . .

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]