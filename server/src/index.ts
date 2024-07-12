import express from 'express';
import { errorHandler } from './middleware/errorMiddleware';
import routes from './routes';
import db from './config/database';
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);
app.use('/upload', express.static("upload"));

// Error handling middleware
app.use(errorHandler);

// Check database connection and synchronize models
db.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return db.sync({ alter: true }); // Automatically update database schema based on changes in Sequelize models
  })
  .then(() => {
    console.log('All models synchronized successfully.');

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });
