FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./
# این مرحله فقط کش نصب‌هاست
RUN yarn install

# حالا بقیه فایل‌ها
COPY . .

EXPOSE 8383
CMD ["yarn", "start:dev"]
