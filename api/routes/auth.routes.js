import express from "express";
import { SignIn, signup } from "../controller/auth.controller.js";

const Router = express.Router();

Router.post('/signup', signup);
Router.post('/sign-in', SignIn);

export default Router