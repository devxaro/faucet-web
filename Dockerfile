FROM node:23.11.0-alpine AS node-base


##
# Build image
#
FROM node-base AS builder
ARG NODE_ENV
ARG VITE_API_BASE_URL
ARG VITE_HMAC_SECRET_KEY
ARG VITE_EXPLORER_URL
ARG VITE_DEFAULT_ADDRESS
ARG VITE_MIN_SCORE

RUN apk --update --no-cache add bash vim net-tools lsof curl git g++ make python3
RUN npm install typescript@5.5.3 -g

WORKDIR /home/node/app

COPY ./ ./
RUN npm run create-env
RUN npm install
RUN npm run build

##
# Runtime image
#
FROM nginx:alpine

COPY --from=builder /home/node/app/build /usr/share/nginx/html
COPY --from=builder /home/node/app/nginx/react-nginx-8080 /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]