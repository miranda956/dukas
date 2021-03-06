const  express= require ("express");
const  Order = require ("../models/orderModel");
const  {isAuth, isAdmin} = require ("../utils");

const router =express.Router();


router.get('/', isAuth, async(req,res)=>{
    const orders= await Order.find({}).populate('user');
    res.send(orders);
});


router.get('/mine',isAuth, async(req,res)=>{
    const orders =await Order.find({
        user: req.user_id});
    res.send(orders)
});

router.get('/:id',isAuth, async(req,res)=>{
    const order =await Order.findOne({
        _id: req.params.id
    });
    if(order){
        res.send(order);
    }  else{
        res.status(404).send('Order not found')
    }
});




router.delete("/:id",isAuth,isAdmin, async(req,res)=>{
    const order =await Order.findOne({
        _id: req.params.id
    });
    if(order){
        const deletedOrder =await order.remove();
        res.send(deletedOrder);
    } else {
        res.status(404).send("Order not found")
    }

})

router.post ("/", isAuth, async(req,res)=>{
    const newOrder = new Order ({
        orderItems: req.body.orderItems,
        user:req.user._id,
        shipping:req.body.shipping,
        payment:req.body.payment,
        itemPrice:req.body.itemPrice,
        taxPrice:req.body.taxPrice,
        shippinPrice:req.body.shippingPrice,
        totalPrice:req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({message:"Order created succesfuly", data: newOrderCreated})
});


router.put ("/:id/pay",isAuth, async (req,res)=>{
    const order =await Order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paidAt= Date.now();
        order.payment={
            payment:'paypal',
            paymentResult:{
                payerID:req.body.payerID,
                orderID:req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder= await order.save();
        res.send({
            message:"Order paid", Order : updatedOrder
        });
    } else{
        res.status(404).send({
            message:"order not found"
        })

    }
});
module.exports =router;
