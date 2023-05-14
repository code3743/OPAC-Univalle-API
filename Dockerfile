FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install playwright
RUN npx playwright install-deps
COPY . .

EXPOSE 3000

CMD [ "npm","start"] 