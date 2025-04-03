import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
};

let connection: mysql.Connection | null = null;

export async function connectToDatabase(): Promise<mysql.Connection> {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
  }
  return connection;
}

export async function closeConnection() {
  if (connection) {
    await connection.end();
    connection = null;
    console.log('MySQL connection closed');
  }
}