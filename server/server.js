const dotenv=require("dotenv");
const mongoose=require('mongoose');
const express=require("express");
const app=express();
dotenv.config({path:'./config.env'});
require('./db/conn');
//const User=require('./model/userSchema');

app.use(express.json());
app.use(require('./router/auth'));

const PORT =process.env.PORT ||5000;
//'mongodb+srv://shailjashree4:0000001@cluster0.pwjfhum.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0'

//middleware

const middleware=(req,res,next)=>{
console.log("Hello my middleware");
next();
}

// app.get("/",(req,res)=>{
//     res.status(200).send("Welcome server.js")
// });
app.get('/signin',(req,res)=>{
    res.send('Welcome signin.js');
})
app.get('/signup',(req,res)=>{
    res.send(`Hello Login world from the server`);
})
app.get('/about', middleware,(req, res) => {
    res.send("Welcome to About page");
});

app.get('/contact', (req, res) => {
    //res.cookie("Test",'thapa');
    res.send("Welcome to Contact page");
});

//const PORT=5000;
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);

});