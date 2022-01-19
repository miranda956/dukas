const  express = require("express");
const  User = require ("../models/userModel");
const  {getToken,isAuth} = require ("../utils");

const router =express.Router();

// register new user 

router.post('/register', async(req,res)=>{
    const user =new User ({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            token: getToken(newUser),

        });
    } else {
        res.status(401).send({
            message:"invalid user data"
        })
    }
});

// user sign in 

router.post("/signin", async(req,res)=>{
    const signinUser =await User.findOne({
        email:req.body.email,
        password:req.body.password,
    });
    if(signinUser){
        res.send({
            _id:signinUser.id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            token: getToken(signinUser),
        });

    }else {
        res.status(401).send({
            message:"invalid Email or password"
        })
    }
});

router.put("/:id", isAuth, async(req,res)=>{
    const userId= req.params.id;
    const user = await User.findById(userId);
    if(user){

        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;
        user.password=req.body.password||user.password;
        const updatedUser =await user.save();
        res.send({
            _id:updatedUser.id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token: getToken(updatedUser),

        })

    } else{
        res.status(404).send({
            message:"user not found"
        })
    }
})

module.exports = router;