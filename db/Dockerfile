FROM postgres:alpine
COPY ./init /docker-entrypoint-initdb.d
RUN ["docker-entrypoint-initdb.d/init-user-db.sh"]