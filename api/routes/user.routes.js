import express from 'express';
import { Test } from '../controller/user.controller.js';

const Router = express.Router();

Router.get('/test' , Test);

export default Router