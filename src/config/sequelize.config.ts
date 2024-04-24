import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Profile from '../models/profile.model'; 

dotenv.config();

console.log(process.env.DB_PORT);

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    models: [User, Profile], // Explicitly list each model
    define: {
      underscored: true, 
    }
  });



// Then, to sync all models:
// async function syncDatabase() {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('All models were synchronized successfully.');
//   } catch (error) {
//     console.error('Error synchronizing models:', error);
//   }
// }

// syncDatabase();