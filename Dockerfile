FROM registry.access.redhat.com/ubi8/nodejs-10

WORKDIR /opt/app-root/src

COPY --chmod=777 . .

WORKDIR /opt/app-root/src/frontend

RUN npm install

RUN npm run build

WORKDIR /opt/app-root/src/backend

RUN rm -r /opt/app-root/src/frontend

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
