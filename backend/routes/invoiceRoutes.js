// @ts-nocheck
const  express = require ("express");
const  Invoice = require ("../models/invoice");
const  {isAuth, isAdmin} = require ("../utils");

const router = express.Router();

router.get('/api/invoices', isAuth,isAdmin,async(req,res)=>{
    const Invoices = await Invoice.find({})
    res.send(Invoices);
})



router.get('/api/invoices/:id', isAuth,isAdmin,async(req,res)=>{
    const invoice = await Invoice.findOne({
        _id: req.params.id
    });
    if(invoice){
        res.send(invoice);
    }else {
        res.status(404).send('Invoice not found')
    }
})


router.delete("/api/invoice/:id",isAuth,isAdmin, async(req,res)=>{
     const invoice = await  Invoice.findOne({
         _id:req.params.id
     });
     if(invoice){
         const deletedInvoice = await invoice.remove();
         res.send(deletedInvoice)

     } else{
         res.status(404).send("Invoice not found")
     }
})

router.post("/api/invoice", isAuth,isAdmin, async(res,req)=>{
    const newInvoice = new Invoice({
      invoiceId:Date.now(),
      dueDate:req.body.dueDate,
      status:req.body.status,
      description:req.body.description,
      amount:req.body.amount,
      product:req.body.product,
      quantity:req.body.quantity

    })
    const newInvoiceCreated = await  newInvoice.save();
    res.status(201).send({message:"Invoice  created succesfuly", data: newInvoiceCreated})
})


router.patch('/api/invoices/:id',isAdmin, isAuth, async(req,res)=>{
    const invoiceId= req.params.id;
    const invoice = await Invoice.findById(invoiceId);
    if(invoice){
        invoice.dueDate= req.body.dueDate;
        invoice.status= req.body.status;
        invoice.amount= req.body.amount;
        invoice.product= req.body.product;
        invoice.description= req.body.description;
        invoice.quantity= req.body.quantity;

        const updatedInvoice= await invoice.save();
        if(updatedInvoice){
            return 
            res.status(200).send({
                message:"invoice updated successfully"
            })
        }
    }
})

module.exports= router;
