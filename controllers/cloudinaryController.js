import cloudinary from "cloudinary"
import config from "../config"

cloudinary.config(config.cloudinary)

export const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Something went wrong"})
    }
}

export const deleteImage = async (req, res) => {
    try{
        const result = await cloudinary.uploader.destroy(req.params.public_id)
        res.jaon(result)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}