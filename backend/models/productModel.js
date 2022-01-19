const  mongoose = require ("mongoose");
const reviewSchema =new mongoose.Schema(
    {
  name:{type:String, required:true},
  rating:{type:Number, default:0},
  comment:{type:String,required:true},

    },
    {
        timestamps:true
    }
);

const productSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        image:{type:String, required:true},
        brand:{type:String, required:true}, 
        price:{type:Number, required:true, default:0},
        category:{type:String, required:true},
        countInstock:{type:Number, required:true, default:0},
        description:{type:String, required:true},
        rating:{type:String, required:true,default:0},
        numReviews:{type:Number, required:true, default:0},
        reviews:[reviewSchema]






    }
)

const productModel = mongoose.model('product',productSchema);

module.exports= productModel;