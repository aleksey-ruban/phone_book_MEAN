FROM node:20.18.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build --prod
EXPOSE 80
CMD ["npx", "http-server", "dist/phone_book_app/browser"]
