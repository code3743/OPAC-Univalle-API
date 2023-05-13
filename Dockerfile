FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install playwright
ENV PLAYWRIGHT_BROWSERS_PATH=/node_modules/playwright/lib
COPY . .

EXPOSE 3000

CMD [ "npm","start"] 