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
ENV MONGO_HOST=backend_db
ENV MONGO_DEBUG=true
ENV PORT=3000

EXPOSE 3000
CMD [ "npm", "start" ]