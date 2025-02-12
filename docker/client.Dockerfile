FROM node:18

WORKDIR /app

COPY client/package*.json ./

RUN npm install
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object@7.21.11

COPY client/ ./

EXPOSE 3000

CMD ["npm", "start"]