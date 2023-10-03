FROM mcr.microsoft.com/devcontainers/javascript-node:18
RUN mkdir /app
WORKDIR /app
COPY . ./
RUN npm i ; npm i -g serve ; npx next build ; npx next export ; find . -maxdepth 1 ! -name out ! -name . ! -name ..  | xargs rm -rf ; npm cache clean --force
EXPOSE 80
WORKDIR out
CMD ["npx", "serve", "-p", "80"]
