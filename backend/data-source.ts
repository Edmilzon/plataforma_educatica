import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { AppDataSourceOptions } from './src/app.module';

config(); 
export default new DataSource(AppDataSourceOptions);