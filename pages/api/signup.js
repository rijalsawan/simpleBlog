import connectDb from "@/middleware/mongoose.js";
import User from "@/models/User.js";
import dotenv from "dotenv";
import md5 from "md5";
dotenv.config();


const handler = async (req, res) => {
  if (req.method == "POST") {
    const {name, email} = req.body;

    let u = new User({name, email, password: md5(req.body.password)});
    await u.save();
    res.status(200).json({success: "success"});
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export default connectDb(handler);
