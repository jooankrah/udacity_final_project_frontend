# Use NodeJS base image
FROM node:13 as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

#copy folder content
COPY ./ ./


#build app

RUN npm run build


#use nginx iamge
FROM nginx:alpine

#delete content of html directory
RUN rm -rf /usr/share/nginx/html/*


#copy content of www directory
COPY  --from=build /usr/src/app/build/ /usr/share/nginx/html/