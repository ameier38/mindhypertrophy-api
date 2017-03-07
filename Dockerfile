FROM node:boron

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app
RUN npm install

# bundle app source
COPY . /usr/src/app

# set api environment variables
ENV NODE_ENV=production
ENV PORT=80
ENV DEBUG=api:*

# set database environment variables
ENV MONGO_HOST=db
ENV MONGO_DATABASE=mindhypertrophy
ENV MONGO_PORT=27017

EXPOSE 80
CMD [ "npm", "start" ]