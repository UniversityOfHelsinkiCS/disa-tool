FROM registry.access.redhat.com/ubi8/nodejs-16

WORKDIR /opt/app-root/src

COPY --chmod=777 . .

WORKDIR /opt/app-root/src/backend

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]