#!/usr/bin/env bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER root;
    CREATE PASSWORD root;
	CREATE DATABASE todolistdb;
	GRANT ALL PRIVILEGES ON DATABASE todolistdb TO root;
EOSQL


psql -v ON_ERROR_STOP=1 --username "root" --password "root" --dbname "todolistdb" <<-EOSQL
    CREATE TABLE todoitems (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(50),
    description VARCHAR(1000),
    dateOfCreation DATE DEFAULT CURRENT_DATE,
    UNIQUE(title)
    );

    insert into todoitems(id,title,description,dateOfCreation)
    values (-1,task1,description_task_1,NULL);
EOSQL