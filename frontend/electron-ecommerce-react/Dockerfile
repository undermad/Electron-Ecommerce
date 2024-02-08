FROM node:18-alpine
LABEL authors="Dominik Tworek"

WORKDIR /app/electron-ecommerce-react

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173
ENTRYPOINT ["npm", "run", "dev", "--", "--host"]