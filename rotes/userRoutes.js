import express from 'express';
import {getAssignment, login, signup } from '../controllers/userController.js';

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/all/assiment", getAssignment);

export default route;



