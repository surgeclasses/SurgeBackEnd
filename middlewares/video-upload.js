const multer = require('multer');

const vidUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, 'uploads/classvideos/');
        },
        filename:(req, file, cb) =>{
            const ext = file.mimetype.split('/')[1];
            cb(null, file.filename+ext);
        }
    }),
    fileFilter: (req, file, cb) =>{
        cb(null, true);
    }
});

module.exports = vidUpload;