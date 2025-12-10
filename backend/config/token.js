import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";

dotenv.config();

export const genToken = async (userId) => {

   try {
    let token = await jwt.sign({userId} , process.env.JWT_SECRET , {expiresIn:"7d"});
    return token;

   } catch (error) {
     console.log("token error");

   }
    
}


export const genToken1 = async (email) => {
  
   try {
    let token = await jwt.sign({email} , process.env.JWT_SECRET , {expiresIn:"7d"})
    return token;
   } catch (error) {
     console.log("token error");
   }

    
}
