const  express  = require("express");
const  Product = require ("../models/productModel");
const  {isAuth, isAdmin} = require ("../utils");

const router=express.Router();


router.get("/",async (req,res)=>{
    const category = req.query.category ? {category: req.query.category} : {};
    const searchKeyword =req.query.searchKeyword
    ? {
        name:{
            $regex:req.query.searchkeyword,
            $options: 'i',
        },

    }
    
    : {};
    const sortOrder=req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
    ? { price: 1 }
    : {price: -1}
    :{ _id: -1 };
    const products =await Product.find({...category, ...searchKeyword}).sort(
        sortOrder
    );
    res.send(products);

});

router.get('/:id',async(req,res)=>{
    const product =await Product.findOne({
        _id:req.body.params.id
    });
    if(product){
        res.send(product);
    } else{
        res.status(404).send({
            message:"product not found"
        });
    }

})

// post a product 

router.post('/',isAuth,isAdmin,async(req,res)=>{
    const product = new Product({
        name: req.body.name,
        price:req.body.price,
        image:req.body.image,
        brand:req.body.brand,
        category:req.body.category,
        countInstock:req.body.countInstock,
        description:req.body.description,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
    });
    const newProduct =await product.save();
    if(newProduct){
        return res.status(201).send({
            message:"product created succesfully",data: newProduct
        });
    }
    return res.status(500).send({
        message:"Error in creating product"
    })

})

router.delete('/:id',isAuth,isAdmin, async(req,res)=>{
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message:"product deleted succefully"});
       
    }
    else{
        res.send('Error in Deletion')
    }
});

// 
router.put('/:id',isAuth,isAdmin, async(req,res)=>{
    const productId=req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInstock = req.body.countInstock;
        product.description=req.body.description;

        const updatedProduct =await product.save();
        if(updatedProduct){
            return 
            res.status(200).send({
                message:"product updated succesfully", data:updatedProduct
            });
        }

    }
})


router.post('/:id/reviews', isAuth, async(req,res)=>{
    const product =await Product.findById(req.params.id);
    if(product){
        const review ={
            name:req.body.name,
            rating:Number(req.body.rating),
            comment:req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews =product.reviews.length;
        product.rating=
        product.reviews.reduce((a,c)=> c.rating+a,0)/
        product.reviews.length;
        const updatedProduct =await product.save();
        res.status(201).send({
            data:updatedProduct.reviews[updatedProduct.reviews.length -1],
            message:"Review saved succefully ",

        })
    }  else {
        res.status(404).send({
            message:'product not found '
        })
    }
})
 module.exports= router;