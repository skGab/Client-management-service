FROM node:21 as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:21
WORKDIR /app
COPY package*.json .
RUN npm install --omit-dev
COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD npm run start:prod
