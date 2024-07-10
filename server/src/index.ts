import express from 'express';
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp('postgres://postgres:12sakib45@localhost:5432/MealManagement');

const app = express();
const port = 8080;

// Check database connection
db.connect()
  .then(obj => {
    obj.done(); // success, release the connection
    console.log('Database connected successfully.');
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
