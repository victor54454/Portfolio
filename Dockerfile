FROM nginx:alpine

RUN apk add --no-cache openssl

COPY . /usr/share/nginx/html/

COPY docker_config/nginx/nginx-ssl.conf /etc/nginx/conf.d/nginx.conf
COPY docker_config/nginx/nginx.conf /etc/nginx/nginx.conf

COPY docker_config/ssl/generate-ssl.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/generate-ssl.sh
RUN /usr/local/bin/generate-ssl.sh

RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /etc/nginx /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nginx:nginx /var/run /run && \
    chmod -R 755 /var/run /run

USER nginx

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]