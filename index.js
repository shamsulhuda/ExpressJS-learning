const express = require('express');
const multer = require('multer');
const path = require('path');

const UPLOADS_FOLDER = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, UPLOADS_FOLDER);
    },
    filename: (req, file, callback) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')}-${Date.now()}`;
        callback(null, fileName + fileExt);
    },
});
const upload = multer({
    storage,
    limits: {
        fileSize: 1000000, // 1MB
    },
    fileFilter: (req, file, callback) => {
        if (file.fieldname === 'avatar') {
            if (
                file.mimetype === 'image/png'
                || file.mimetype === 'image/jpg'
                || file.mimetype === 'image/jpeg'
            ) {
                callback(null, true);
            } else {
                callback(new Error('only .jpg, .png or .jpeg format allowed!'));
            }
        } else if (file.fieldname === 'doc') {
            if (file.mimetype === 'application/pdf') {
                callback(null, true);
            } else {
                callback(new Error('only .pdf format allowed!'));
            }
        } else {
            callback(new Error('Unknown Error!'));
        }
    },
});

const app = express();
const port = 3000;

app.post('/', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'doc', maxCount: 1 },
]), (req, res) => {
    res.send('Hello Express JS!');
});

// Default error handles
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send('File Upload error!');
        } else {
            res.status(500).send(err.message);
        }
    } else {
        res.send('Success');
    }
});

app.listen(port, () => {
    console.log(`Listening port:: ${port}`);
});
