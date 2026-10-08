import express from 'express';
import multer from 'multer';
import path from 'path';

const port = 8089;
const app = express();

app.use(express.json());
app.use('/uploads', express.static("uploads"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed"));
        }
    }
});

app.get('/', (req, res) => {

    res.send("Hello NodeJs")
})

app.post("/user", (req, res) => {

    console.log(req.body)


    res.json({})
})

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file.buffer)

    const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;


    res.json({
        message: "Image uploaded successfully",
        file: imageUrl
    });
})

app.post("/gallery", upload.array("images"), (req, res) => {
    console.log(req.files)


    res.json({
        message: "Image uploaded successfully",
        file: req.files
    });
})

app.listen(port, () => {
    console.log(`Server listing on port ${port}`)
})