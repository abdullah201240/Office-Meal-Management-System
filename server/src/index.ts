// src/index.ts
import express from 'express';
import { errorHandler } from './middleware/errorMiddleware';
import routes from './routes';
import sequelize from './config/database';

const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });
