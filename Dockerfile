FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn global add @nestjs/cli
RUN yarn add redis class-validator class-transformer @nestjs/swagger
RUN yarn install

COPY . .

EXPOSE 8383

CMD ["yarn", "start:dev"]
