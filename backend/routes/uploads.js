const  express = require ("express");
const  multer = require ("multer");
const  multerS3 = require("multer-s3");
const  aws = require('aws-sdk');
const  config = require("../config");

const storage = multer.diskStorage({
    destination(req,res,cb){
        cb(null, 'uploads/');
    },
    filename(req,res,cb){
        cb(null,`${Date.now()}.jpg`)
    }
})

const upload = multer({ storage});

const router = express.Router();

router.post('/', upload.single('image'),(req,res)=>{
  res.send(`/${req.file.path}`);
});

aws.config.update({
    accessKeyId:config.acessKeyId,
    secretAccessKey:config.secretAcessKey,
});

const s3 = new aws.S3();
const storageS3= multerS3({
    s3,
    bucket :'amazon-bucket',
    acl:'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key (req,file,cb){
        cb(null, file.originalname);
    },
});
const uploadS3 =multer({
   storage:storageS3 
});

router.post('/s3', uploadS3.single('image'),(req,res)=>{
    res.send(req.file.location);

});

module.exports = router;
