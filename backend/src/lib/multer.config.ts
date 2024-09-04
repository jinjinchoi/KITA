import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { diskStorage, FileFilterCallback } from 'multer';
import {extname, basename, join} from 'path';


export const multerOptions = {
    storage: diskStorage({
        destination: join(__dirname,"..","..", "static","img"),
        filename: (req, file, cb) => {
            const fileExtName = extname(file.originalname);
            const newFileName = basename(file.originalname, fileExtName) + '_' + Date.now() + fileExtName;
            cb(null, newFileName);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb:FileFilterCallback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new HttpException ({message: '허용되지 않은 파일 타입입니다.'}, HttpStatus.BAD_REQUEST));
        }
    }
};