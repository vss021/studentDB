import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./DB/dbConnetction.js";
import userRouter from "./rotes/userRoutes.js";
import teacherRouter from "./rotes/teacherRoutes.js";

const app = express();
dotenv.config(); 


app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", teacherRouter);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
