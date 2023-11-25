@echo off

rem Set your PostgreSQL username and password
set DB_USER=postgres
set DB_PASSWORD=root

rem Create the database
createdb -U %DB_USER% TP4

rem Run the schema SQL file
psql -U %DB_USER% TP4 < bdschema.sql

rem Run the data SQL file
psql -U %DB_USER% TP4 < data.sql

echo Database TP4 created and populated.
