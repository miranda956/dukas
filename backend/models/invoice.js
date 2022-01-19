const  mongoose = require ("mongoose");

const customertSchema = new mongoose.Schema(
{
    customerName:{type:String, required:true},
    contact:{type:String , required:true},
    email:{type:String, required:true}

},
{
    timestamps: true
}
);


const invoiceSchema = new mongoose.Schema({
invoiceId:{type:String, required:true},
dueDate:{type:Date, required:true},
status:{type:String, required:true},
description:{type:String, required:true},
amount:{type:Number, required:true},
product:{type:String ,required:true},
quantity:{type:Number, required:true},
customerInfo:[customertSchema]


})

const invoiceModel = mongoose.model('invoice',invoiceSchema);

 module.exports= invoiceModel;