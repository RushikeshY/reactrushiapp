FROM mcr.microsoft.com/devcontainers/javascript-node:18
RUN mkdir /app ;\
    mkdir ~/.ssh ;\
    apt update ;\
    apt install --no-install-recommends -y openssh-server screen dialog ;\
    echo "root:Docker!" | chpasswd

WORKDIR /app
COPY . ./
RUN npm i
EXPOSE 80 2222 22
CMD ["bash", "start.sh"]

