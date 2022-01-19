const  mongoose = require ('mongoose');

const shippingSchema={
    address:{type:String, required:true},
    city:{type:String, required:true},
    postalCode:{type:String, required:true},
    country:{type:String, required:true}
}

const paymentSchema ={
    paymentMethod:{type:String, required:true},

};

const OrderItemSchema = new mongoose.Schema({
    name:{type:String, required:true},
    qty:{type:Number, required:true},
    image:{type:String, required:true},
    price:{type:String,required:true},
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },

});

const orderSchema =new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    orderItems:[OrderItemSchema],
    shipping:shippingSchema,
    payment:paymentSchema,
    itemPrice:{type:Number},
    taxprice:{type:Number},
    shippingPrice:{type:Number},
    totalPrice:{type:Number},
    isPaid:{type:Boolean, default:false},
    paidAt:{type:Date},
    isDelivered:{
        type:Boolean,default:false
    },
    deliveredAt:{
        type:Date
    }


});

const orderModel = mongoose.model("Order",orderSchema);
module.exports= orderModel;