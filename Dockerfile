FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install playwright
COPY . .
# Instalamos dependencias de Chromium
RUN apk add --no-cache chromium \
    && rm -rf /var/cache/apk/*

# Configuramos la variable de entorno para que Playwright utilice Chromium
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin/chromium-browser

EXPOSE 3000

CMD [ "npm","start"] 