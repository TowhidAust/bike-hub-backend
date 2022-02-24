const multer = require('multer');  //required library for image upload
const path = require('path');


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        // token = bearerToken;
        req.token = bearerToken;

        jwt.sign({usersData}, 'secretkey', (err, token)=>{

            return res.json({
                message: "user signup success",
                token: token
            })
        })


        next();
    } else {
        res.sendStatus(403)
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000000000}
}).single('image')




module.exports = {
    verifyToken, upload
}