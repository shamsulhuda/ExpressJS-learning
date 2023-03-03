const express = require('express');
const multer = require('multer');

const UPLOADS_FOLDER = "./uploads/";
var upload = multer({
    dest: UPLOADS_FOLDER,
    limits: { 
     fileSize: 1000000 // 1MB 
    },
    fileFilter: (req, file, cb)=> {
        if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
            cb(null, true);
        }else{
            cb(new Error("only .jpg, .png or .jpeg format allowed!"))
        }
    }
});

const app = express();
const port = 3000;

app.post('/', upload.single('avatar'), (req, res) => {
    res.send('Hello Express JS!');
});

// Default error handles
app.use((err, req, res, next) => {
    if(err){
        res.status(500).send(err.message);
    }else{
        res.send("Success");
    }
});

app.listen(port, () => { 
    console.log(`Listening port:: ${port}`);
});
