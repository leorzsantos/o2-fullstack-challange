# Usar a imagem oficial do Node.js como base
FROM node:18.17.0-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código do aplicativo
COPY . .

# Construir o aplicativo Next.js
RUN npm run build

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
