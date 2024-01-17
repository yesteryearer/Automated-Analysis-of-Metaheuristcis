FROM node:20.2.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

RUN npm install react-scripts@5.0.1 -g

ARG REACT_APP_API_ENDPOINT
ARG DOCKER_FRONTEND_PORT
ENV REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT

COPY . .

EXPOSE ${DOCKER_FRONTEND_PORT}

CMD ["npm", "start"]

