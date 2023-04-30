import multer from 'multer';
import fs from 'fs';
import ControllerResponse from './ControllerResponse';
import HttpStatusCode from '../enums/HttpStatusCode';
import { networkInterfaces } from 'os';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static_files/avatars');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5  // 5mb
    }
});

const uploadImage = (req, res, next) => {
    upload.single('avatar')(req, res, function (err) {
        if (err || err instanceof multer.MulterError){
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.status(413).send({message: 'File size too large'});
            } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                res.status(400).send({message: 'Too many files'});
            } else {
                res.status(400).send({message: err});
            }
            return ;
        }
        next();
    })
  }

export default uploadImage;
