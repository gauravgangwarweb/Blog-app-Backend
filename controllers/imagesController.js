import cloudinary from 'cloudinary';
import config from '../config'; // Adjust the path accordingly

cloudinary.config(config.cloudinary);

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // Optionally, you can save the public_id and other details to a database
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.public_id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
