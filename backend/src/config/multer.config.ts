import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Only images are allowed."));
        }
        cb(null, true);
    }
});


export default upload;