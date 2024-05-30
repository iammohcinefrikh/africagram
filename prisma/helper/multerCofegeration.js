const multer= require("multer")
const path= require("path")


const storage= multer.diskStorage({
    destination:"./uploads",
    // this method is not working proprly it's giving NAN instande of the file name
    // filename:(req,file,cd)=>{
    //     return cd(null,file.filename+Date.now() + path.extname(file.originalname));
    // }
    filename: (req, file, cb) => {
        // Ensure filename is a combination of timestamp and original name to avoid 'NaN'
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        cb(null, `${timestamp}-${baseName}${ext}`);
    }
})
// const upload = multer({ storage: storage });

const upload = multer({
    storage:storage,
    limits:{fileSize: 40000000},
    fileFilter:(req,file,cd)=>{
        checkFileType(file,cd)
    },
})


const checkFileType=(file, cb)=> {
    const filetypes = /jpeg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload