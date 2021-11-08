import express  from "express";
import Product from "../models/productModel";
import {isAuth, isAdmin} from "../utils";

const router=express.Router();


router.get("/",async (req,res)=>{
    const category = req.query.category ?{category: req.query.category}:{};
    const searchKeyword =req.query.searchKeyword
    
})