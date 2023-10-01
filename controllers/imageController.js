import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const public_id = req.params.public_id;
    await cloudinary.v2.uploader.destroy(public_id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image deletion failed' });
  }
};
