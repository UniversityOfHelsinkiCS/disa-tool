FROM node:16

WORKDIR /opt/app-root/src

COPY --chmod=777 . .

WORKDIR /opt/app-root/src/frontend

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
