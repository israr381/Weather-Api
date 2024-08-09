import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from "./config/db.js";

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.log(`Error: ${err.message}`);
      console.log(`Shutting down the server due to Unhandled Promise Rejection`);

      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed!', err);
  });
