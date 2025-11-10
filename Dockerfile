FROM node:23

WORKDIR /usr/src/app

# فقط package.json و yarn.lock برای cache نصب
COPY package*.json ./
RUN yarn global add @nestjs/cli
RUN yarn install

# حالا کل کد پروژه رو کپی کن
COPY . .

EXPOSE 8383

# اجرای Nest از داخل node_modules (بدون نیاز به نصب global)
CMD ["yarn", "start:dev"]
