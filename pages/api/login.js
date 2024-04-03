import connectDb from "../../middleware/mongoose.js";
import User from "../../models/User.js";
import md5 from "md5";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    
    if (user){
        if (req.body.email === user.email && md5(req.body.password) == user.password) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({ success: true, token: token });
        }
        else {
          console.log(user.email, user.password, req.body.email, req.body.password);
        res.status(400).json({success: false, error: "Invalid Credentials"});
        }
    }
    else {
      res.status(400).json({success:false, error: "Please Register First and Login" });
    }
  } 
};

export default connectDb(handler);
