# Etapa 1: Build da aplicação Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir arquivos estáticos com Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY public/favicon.ico /usr/share/nginx/html/favicon.ico
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
