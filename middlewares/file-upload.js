const multer = require('multer');
var path = require('path');

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, 'uploads/classfiles/');
        },
        filename:(req, file, cb) =>{
            const ext = path.extname(file.originalname); //file.mimetype.split('/')[1];
            cb(null, file.filename+ext);
        }
    }),
    fileFilter: (req, file, cb) =>{
        cb(null, true);
    }
});

module.exports = fileUpload;