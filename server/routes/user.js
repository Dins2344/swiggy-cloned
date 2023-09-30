const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb')
const jwt = require('../middlewares/jwt')

router.get("/", (req, res) => {
  res.json("dkfjsdkfsd");
});

router.post("/signup", async (req, res) => {
  try {
    const Data = req.body;
    console.log(Data);
    const { email, password, name, phoneNumber } = Data;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ error: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "user created successfully", signInStatus: true });
  } catch (error) {
    console.error("error during signup:", error);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if(user.blocked){
      return res.status(404).json({ error: "user is blocked" });
    }else{
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.tokenGenerator(email)
      console.log(token)
      return res
        .status(200)
        .json({ message: "Login successful", loginStatus: true,accessToken:token,user });

    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get('/user-info',jwt.jwtVerify,async(req,res)=>{
    try{
        const userData = req.user
        console.log(userData.email)
        const user = await User.findOne({email:userData.email})
        res.json(user)
    }catch(error){
        console.log(error)  
    }
})
router.post("/user-info", async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const { userID,email } = data;
    const user = await User.findOne({email})
    if(user){
        console.log(user)
        console.log('update failed user exits')
        res.json({error:'user exist'})
    }else{
        User.updateOne(
            { _id:new ObjectId(userID) },
          { name: data.name, email: data.email, phoneNumber: data.phoneNumber }
        )
          .then((response) => {
            if(response){
              console.log("updated");
              res.json(response)
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  } catch (error) {
    console.log("update failed", error);
  }
});

module.exports = router;
