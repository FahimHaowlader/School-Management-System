import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './db/db.js'; // your db.js file
import app from './app.js';          // your Express app

let server; // declared outside for access in shutdown()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 10000, () => {
         // console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
     // console.log("MONGO db connection failed !!! ", err);
})
