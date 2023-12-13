FROM node:18.16.0
WORKDIR /home/node/app
COPY . .

RUN yarn install
RUN yarn build
CMD yarn start

EXPOSE 3505