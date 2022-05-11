FROM node:12
RUN mkdir -p /src
ADD . /src 


WORKDIR /src
#COPY package.json /src/package.json
#COPY . /src
RUN npm install
CMD node server.js
#COPY index.js /src/index.js
# RUN pod install

#for dev env
#FROM mhart/alpine-node:12
#WORKDIR /src
#COPY --from=build-env /src /src
#EXPOSE 8081
#RUN pod install
# CMD react-native run-ios