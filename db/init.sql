-- CREA UNA BASE DE DATOS SI NO EXISTE [NOMBRE_DB]
SELECT 'CREATE DATABASE angelmrdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'angelmrdb')\gexec