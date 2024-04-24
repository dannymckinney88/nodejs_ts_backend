import express from 'express';
import cors from 'cors';
import { sequelize } from './config/sequelize.config';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the fitness app API.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
