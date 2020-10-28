const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// LOAD env vars
dotenv.config({ path: './config/config.env' });

// connnect to DB
connectDB();

// Rout files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

// start server: $ npm run dev
const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close app & exit process
  server.close(() => process.exit(1));
});
