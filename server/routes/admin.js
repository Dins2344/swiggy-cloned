const express = require('express')
const Admin = require('../schemas/adminSchema')
const User = require('../schemas/userSchema')
const router = express.Router()
const { ObjectId } = require('mongodb')

const adminData = {
    userName:"admin",
    password:"admin"
}

router.get('/',(req,res)=>{

})

router.post('/login',(req,res)=>{
   const {userName,password} = req.body
    if(userName == adminData.userName && password == adminData.password){
        res.json({loginStatus:true})
    }else{
        res.json({error:'invalid username or password'})
    }
})

router.get('/users',async(req,res)=>{
    const users = await User.find({})
    res.json({users})
})
router.get('/users/update/:id',async(req,res)=>{
    const id = req.params.id
    const user = await User.findOne({_id:new ObjectId(id)})
    console.log(user)
    if(user.blocked){
        await User.updateOne({_id:new ObjectId(id)},{blocked:false})
    }else{
        await User.updateOne({_id:new ObjectId(id)},{blocked:true})
    }
})

router.get('/users/delete/:id',async(req,res)=>{
    const id = req.params.id
    await User.deleteOne({_id: new ObjectId(id)})
    res.json()
})

router.get('/blockedData',async(req,res)=>{
    const blockedUsers = await User.find({blocked:true})
    res.json(blockedUsers)
})

module.exports = router