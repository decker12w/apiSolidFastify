# Fase de construção
FROM node:21 as build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npx prisma generate
RUN npm run build

#Fase de teste

RUN npm ci --only=production && npm cache clean --force

# Fase de produção
FROM node:21-alpine3.20

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/package-lock.json ./package-lock.json
COPY --from=build /usr/src/app/.env .env


ENV NODE_ENV production
EXPOSE 3000

CMD [ "npm" ,"run","start" ]
