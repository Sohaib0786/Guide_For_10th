import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";


   //Registration Controller logic

export const registration = async (req, res) => {
  try {
    const { name, email, password, class: userClass, age, interests } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exist" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Enter valid Email" });

    if (password.length < 8)
      return res.status(400).json({ message: "Enter Strong Password" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      class: userClass || "",
      age: age || "",
      interests: interests || []
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user });
  } catch (error) {
    console.log("registration error", error);
    return res.status(500).json({ message: `registration error ${error}` });
  }
};




//Login Controller logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check User Exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate Token
    const token = await genToken(user._id);

    // Send Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // RETURN SAFE USER DATA
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};




   //Logout controller logic  
  export const logOut = async (req,res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({message:"logOut successful"});
  } catch (error) {
    //console.log("logOut error");
    console.log(error);
    return res.status(500).json({message:`LogOut error ${error}`});
    }
    
    }


/*
    //google Controller logic

  export const googleLogin = async (req,res) => {
    
    try {

         let {name , email} = req.body;

         let user = await User.findOne({email}); 

        if(!user){
          user = await User.create({
            name,
            email
        })
        }
       
        let token = await genToken(user._id)
        res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json(user)

    } catch (error) {
         console.log("googleLogin error")
    return res.status(500).json({message:`googleLogin error ${error}`})
    }
    
}


export const adminLogin = async (req,res) => {
    try {
        let {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        let token = await genToken1(email)
        res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
    })

    
    return res.status(200).json(token)
        }
        return res.status(400).json({message:"Invaild creadintials"})

    } catch (error) {
        console.log("AdminLogin error");
    return res.status(500).json({message:`AdminLogin error ${error}`})
        
    }
    
}
*/
export const getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.log(error);
    res.status(500).json({ message: err.message });
  }
};