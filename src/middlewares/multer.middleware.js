import multer from "multer";

const storage = multer.diskStorage({
    destination:function (req,file,cb) { 
        cb(null,"./public");
    },
    filename:function (req,file,cb) {
       const unique_suffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        cb(null,file.fieldname + '-' + unique_suffix);
    }
})

export const upload = multer({storage:storage});
