const  dotenv = require ('dotenv');

dotenv.config();

module.exports= {
    PORT:process.env.PORT||5000,
    JWT_SECRET:process.env.JWT_SECRET || 'somethingsecret',
    MONGODB_URL: "mongodb://127.0.0.1:27017/sellmore"


}