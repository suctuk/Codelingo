FROM node:18

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm install 

COPY server/ .
COPY server/scripts/docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3001

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "start"]