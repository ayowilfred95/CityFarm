FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Copy .env file if it exists
COPY .env* ./

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

# Copy .env file if it exists
COPY --from=development /usr/src/app/.env* ./

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
