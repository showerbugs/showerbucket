FROM node:6.10
MAINTAINER showerbugs <showerbugs@gmail.com>

WORKDIR /app

ADD ./yarn.lock /app/
RUN yarn install

EXPOSE 8080
CMD yarn dev
