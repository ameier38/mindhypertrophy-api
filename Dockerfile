FROM node:boron

# Create app directory
RUN mkdir -p /usr/code
WORKDIR /usr/code

# Install app dependencies
COPY package.json /usr/code
RUN npm install

# Bundle app source
COPY . /usr/code

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV MONGO_HOST=backend_db
ENV MONGO_DATABASE=mindhypertrophy
ENV MONGO_PORT=27017
ENV DEBUG=api:*

EXPOSE 3000
CMD [ "npm", "start" ]