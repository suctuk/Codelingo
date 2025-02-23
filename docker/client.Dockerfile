# Build Stage
FROM node:18 as build
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Serve Stage
FROM node:18 as serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
CMD ["serve", "-s", "build", "-l", "3000"]
