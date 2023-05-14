FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# 1. Add tip-of-tree Playwright package to install its browsers.
#    The package should be built beforehand from tip-of-tree Playwright.
COPY ./playwright-core.tar.gz /tmp/playwright-core.tar.gz

# 2. Bake in Playwright Agent.
#    Playwright Agent is used to bake in browsers and browser dependencies,
#    and run docker server later on.
#    Browsers will be downloaded in `/ms-playwright`.
#    Note: make sure to set 777 to the registry so that any user can access
#    registry.
RUN mkdir /ms-playwright && \
    mkdir /ms-playwright-agent && \
    cd /ms-playwright-agent && npm init -y && \
    npm i /tmp/playwright-core.tar.gz && \
    npx playwright mark-docker-image "${DOCKER_IMAGE_NAME_TEMPLATE}" && \
    npx playwright install --with-deps && rm -rf /var/lib/apt/lists/* && \
    rm /tmp/playwright-core.tar.gz && \
    chmod -R 777 /ms-playwright

EXPOSE 3000

CMD [ "npm","start"] 