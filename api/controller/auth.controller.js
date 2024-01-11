import User from "../model/user.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utilities/error.js";
import jwt from 'jsonwebtoken';

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

export const SignIn = async (req, res, next) => {
   const {email, password } = req.body;
   // const hidePassword = bcryptjs.hashSync(password, 10);
   // const newUser = new User ({ username, email, password:hidePassword});
   try{
      const validUser = await User.findOne({email});
         if(!validUser)
         return next(errorHandler(404, 'User Not Found'));
      const validPass = bcryptjs.compareSync(password, validUser.password);
         if(!validPass)
         return next(errorHandler(401, 'Wrong Credentials!'));
      const webToken = jwt.sign({ id: validUser._id },process.env.JWT_Secret);
      const { password: pass, ...rest} = validUser._doc;
      res.cookie('Access_Token', webToken, { httponly: true }).status(200).json(rest);
   }
   catch(err){
    next(err)
   }
};