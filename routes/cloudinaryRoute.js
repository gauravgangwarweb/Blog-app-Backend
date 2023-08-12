import express from "express"
import multer from "multer"
import { deleteImage, uploadImage } from "../controllers/cloudinaryController"

const router = express.Router()

const upload = multer({dest: 'uploads/'})

router.post('/upload', upload.single('image'), uploadImage)

router.delete('/delete/:public_id', deleteImage)

export default router