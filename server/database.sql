DROP DATABASE IF EXISTS riskmanager WITH (FORCE);
CREATE DATABASE riskmanager;

\c riskmanager;

DROP TABLE IF EXISTS todo;
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);