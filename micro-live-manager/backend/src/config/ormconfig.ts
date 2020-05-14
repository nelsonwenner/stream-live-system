import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import 'dotenv/config';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    path.resolve(__dirname, '..', 'database', 'entities', '*'),
    'dist/**/*.entity.js'
  ],
  migrations: [
    path.resolve(__dirname, '..', 'database', 'migrations', '*')
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: true,
  logging: true,
};

module.exports = options;