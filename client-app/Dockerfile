# build environment
FROM node:14.15.0 as build
WORKDIR /app
COPY package.json .
COPY ./build ./build

# nginx serve
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
CMD [ "nginx", "-g", "daemon off;"]
