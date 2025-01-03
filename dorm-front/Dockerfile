FROM nginx
RUN ["rm" ,"-rf", "/usr/share/nginx/html/*"]
COPY ./default.conf /etc/nginx/conf.d/p.conf
COPY .next /usr/share/nginx/app
EXPOSE 3000
