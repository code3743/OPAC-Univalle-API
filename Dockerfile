FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install playwright
COPY . .
# Instalamos dependencias de Chromium
RUN apt-get update && apt-get install -y chromium
RUN apt-get update && apt-get install -y libnss3-dev libx11-xcb1 libxcomposite1 libxdamage1 \
libxi6 libxtst6 libglib2.0-0 libxslt1.1 libgstreamer-plugins-base1.0-0 libgstreamer1.0-0 \
libfontconfig1 libdbus-1-3 libegl1-mesa-dev libnotify4 libgdk-pixbuf2.0-0 libgtk-3-0 \
libxss1 libsrtp2-dev libxkbcommon-x11-0 libxkbcommon0



# Configuramos la variable de entorno para que Playwright utilice Chromium
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin

EXPOSE 3000

CMD [ "npm","start"] 