const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
//require('../db/conn');
const bcrypt = require('bcrypt'); 
const User=require("../model/userSchema");
router.get("/",(req,res)=>{
    res.status(200).send("Welcome router.js")
});


// router.post('/register',async(req,res)=>{
//     const{name,email,phone,work,password,cpassword}=req.body;
    
//     if(!name||!email||!phone||!work||!password||!cpassword){
//         return res.status(422).json({error:"details error"});
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exists"});
//         }

//         const user=new User({name,email,phone,work,password,cpassword});
//         user.save()
//         .then((userExist)=>{
//             res.status(201).json({message:"user registered successfully"});
//         }).catch((err)=>res.status(500).json({error:"Failed to register user"}));
//     }).catch(err =>{console.log(err);
//     res.status(500).json({error:"Internal server error"});
// });
// });
//aync await

router.post('/register',async(req,res)=>{
    const{name,email,phone,work,password,cpassword}=req.body;
    
    if(!name||!email||!phone||!work||!password||!cpassword){
        return res.status(422).json({error:"details error"});
    }
    try{

        const userExist= await User.findOne({email:email});
       if(userExist){
        return res.status(422).json({error:"Email already exists"});
    }else if(password !=cpassword) {
        return res.status(422).json({error:"password are not matching"});

    }
    else
    {
        const user=new User({name,email,phone,work,password,cpassword});
    await user.save();
    res.status(201).json({message:"user registered successfully"});
    }
    

    }catch(err){
        console.log(err)
    }
   
});

router.post('/signin',async(req,res)=>{
//    console.log(req.body);
//    res.json({message:"awesome login"})
    try{
        let token;
        const{email,password}=req.body;
        if(!email ||!password){
            return res.status(400).json({error:"Pls fill the data"})
        }
        const userLogin= await User.findOne({email:email});
       if(userLogin){
        const isMatch= await bcrypt.compare(password,userLogin.password);
       token= await userLogin.generateAuthToken();
       console.log(token);

       res.cookie("jwtoken",token ,{
        expires:new Date(Date.now()+25892000000),
        httpOnly:true
       });
       
       if(!isMatch){
            res.status(400).json({error:"Invalid credientials pass"});
         }else{
            res.json({message:"user Signin Successfully"});
         }  
       }else{
        res.status(400).json({error:"Invalid credientials"});
       }
       
         
    }catch(err){
        console.log(err);

    }
});
module.exports = router;