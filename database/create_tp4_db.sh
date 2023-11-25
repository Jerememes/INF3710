#!/bin/bash

# Set your PostgreSQL username and password
DB_USER="postgres"
DB_PASSWORD="root"

# Create the database
createdb -U $DB_USER TP4

# Run the schema SQL file
psql -U $DB_USER TP4 < bdschema.sql

# Run the data SQL file
psql -U $DB_USER TP4 < data.sql

echo "Database TP4 created and populated."
