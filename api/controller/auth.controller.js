import User from "../model/user.js";
import bcryptjs from 'bcryptjs';
// import { errorHandler } from "../utilities/error.js";

export const signup = async (req, res, next) => {
   const { username , email, password } = req.body;
   const hidePassword = bcryptjs.hashSync(password, 10);
   const newUser = new User ({ username, email, password:hidePassword});
   try{
    await newUser.save();
    res.status(201).json('User Created Succesfully');
   }
   catch(err){
    next(err)
   }
 
  
};