import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  throw new Error('La variable de entorno DB_URL no está definida.');
}
export const APP_DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  url: DB_URL,
  entities: ['./dist/**/**/*.entity.js'],
  migrations: ['./dist/migration/*.js'],
  synchronize: false,
  logging: false,
};
const APP_DATA_SOURCE = new DataSource(APP_DATA_SOURCE_OPTIONS);
export default APP_DATA_SOURCE;
