FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install playwright
COPY . .
# Instalamos dependencias de Chromium
RUN apt-get update && apt-get install -y chromium


# Configuramos la variable de entorno para que Playwright utilice Chromium
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin

EXPOSE 3000

CMD [ "npm","start"] 