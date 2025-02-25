FROM node:22

WORKDIR /back-end

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código-fonte
COPY . .

# Copiar o script wait-for-it.sh
COPY wait-for-it.sh /wait-for-it.sh


RUN apt-get update && apt-get install -y dos2unix \
    && dos2unix /wait-for-it.sh \
    && chmod +x /wait-for-it.sh

# Configuração de ambiente
ENV PORT=5000

# Expor a porta
EXPOSE 5000

# Comando de inicialização
CMD ["/wait-for-it.sh", "mongo:27017", "--", "npm", "run", "server"]