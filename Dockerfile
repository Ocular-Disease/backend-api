FROM node:alpine as builder

MAINTAINER Mohamed Belkamel

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

FROM node:alpine as runner

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY --from=builder /app/dist ./

ENV NODE_ENV production
ENV PORT 8080

CMD ["node", "."]