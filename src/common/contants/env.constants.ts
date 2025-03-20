//set these env variables in your .env file.
// Your env file will look like this
    // DATABASE_HOST='localhost'
    // DATABASE_PORT=5432
    // DATABASE_USERNAME='postgres'
    // DATABASE_PASSWORD=1234
    // DATABASE_NAME='employees'

    // JWT_PUBLIC_SECRET='this-is-the-secret',
    // JWT_EXPIRY_TIME='7d'
export enum EnvVariable {
    DATABASE_HOST = 'DATABASE_HOST',
    DATABASE_NAME = 'DATABASE_NAME',
    DATABASE_PASSWORD = 'DATABASE_PASSWORD',
    DATABASE_PORT = 'DATABASE_PORT',
    DATABASE_USERNAME = 'DATABASE_USERNAME',
    PORT = 'PORT',

    JWT_PUBLIC_SECRET = 'JWT_PUBLIC_SECRET',
    JWT_EXPIRY_TIME = 'JWT_EXPIRY_TIME'
}