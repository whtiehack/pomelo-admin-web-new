FROM node:8.12 as srcnode
ADD . /data/app

WORKDIR /data/app
RUN npm install


FROM node:8.12
COPY --from=srcnode /data/app /data/app
WORKDIR /data/app
EXPOSE 7001

CMD ["node","app.js"]