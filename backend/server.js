// @ts-nocheck
const express = require ("express");
const path = require("path");
const mongoose = require("mongoose");
const  bodyParser  = require("body-parser");
const  config = require("./config")
const  UserRoute = require("./routes/userRoute");
const  orderRoute = require ("./routes/orderRoute");
const  productRoute = require("./routes/productRoute")
const  uploadRoute = require ('./routes/uploads');
const  invoiceRoute = require ('./routes/invoiceRoutes');
const URI =config.MONGODB_URL;


mongoose. connect ( URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    serverSelectionTimeoutMS: 10000
}).then(()=>{
    console.log("connection established")
}).catch((err)=>{
    console.log(err)
})






    
const app =express();

app.use(bodyParser.json());
app.use("/api/users",UserRoute);
app.use("/api/product",productRoute);
app.use("/api/orders",orderRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/invoices', invoiceRoute);


const port = process.env.PORT || 5300;

app.listen(port, () => `Server running on port ${port} 🔥`);
       

