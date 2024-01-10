import User from "../model/user.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
   const { username , email, password } = req.body;
   const hidePassword = bcryptjs.hashSync(password, 10);
   const newUser = new User ({ username, email, password:hidePassword});
   try{
    await newUser.save();
    res.status(201).json('User Created Succesfully');
   }
   catch(err){
    res.status(500).json(err.message)
   }
 
  
};