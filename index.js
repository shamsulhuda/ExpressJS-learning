const { MongoClient, ServerApiVersion } = require('mongodb');
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

// DB info

const uri = 'mongodb+srv://shamsulhuda:92xxEt5giBzpxpgr@cluster0.abrghjl.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const collection = client.db('test').collection('devices');
    //   const doc = {
    //     title: 'Record of a Shriveled Datum',
    //     content: 'No bytes, no problem. Just insert a document, in MongoDB',
    //   };
    //   const result = await collection.insertOne(doc);
      // create a document to insert
        console.log('hello');
    } finally {
        console.log('Should close here');
    }
  }
  run().catch(console.dir);

app.listen(port, () => {
    console.log(`Listening port:: ${port}`);
});
