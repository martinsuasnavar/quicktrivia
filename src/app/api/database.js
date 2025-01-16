import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

//import { env } from 'process';
const caCert = process.env.CA_CERT 
    ? Buffer.from(process.env.CA_CERT, 'base64').toString() 
    : null;

if (!caCert) {
    throw new Error('CA_CERT no está configurado en las variables de entorno.');
}
let connection

 export const connectToDatabase = async () => {
    if(!connection) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: {
                ca: caCert
            },
        });
    }
    return connection;
 };