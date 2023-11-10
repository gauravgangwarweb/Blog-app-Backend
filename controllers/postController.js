import { Model } from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";


//Create new post
export const createPost = async (req, res) => {
    try {
        const {title, publicId, imageUrl, userId, body} = req.body

        if (req.decodedToken.user !== userId) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        //check if the user exist
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: "User does not exiat"})
        }

        const post = await Post.create({title, publicId, imageUrl, userId, body})
        res.status(201).json({message: "Post created🎉🎉"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

//get all post
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('userId')
        res.status(200).json({status: "SUCCESS", data: posts})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//get a single post by ID
export const getPostById = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id).populate('userId').populate('likes').populate('comments')


        if(!post) {
            res.status(404).json({error: "Post not found"})
        }

        const postData = {
            title: post.title,
            publicId: post.publicId,
            imageUrl: post.imageUrl,
            userId: post.userId,
            body: post.body,
            likes: post.likes,
            comments: post.comments
        }

        res.status(201).json({ status: "SUCCESS", data: post})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//Update post
export const updatePost = async (req, res) => {
    try{
        const {id} = req.params
        const { title, publicId, imageUrl, body } = req.body
        const options = {new: true}

        const updateFields = {}

        if(title) updateFields.title = title;
        if(publicId) updateFields.publicId = publicId;
        if(imageUrl) updateFields.imageUrl = imageUrl;
        if(body) updateFields.body = body

        const post = await Post.findById(id)

        if (JSON.stringify(req.decodedToken.user) !== JSON.stringify(post.userId)) {
            return res.status(401).json({ error: 'Unauthorized access ddd' });
        }

        const result = await Post.findByIdAndUpdate(
            id, updateFields , options
        )

        res.status(201).json({message: "Post updated 🍻"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

//delete post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id);

        // Check if the logged-in user is authorized to delete the post
        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        
        if (JSON.stringify(req.decodedToken.user) !== JSON.stringify(post.userId)) {
            return res.status(401).json({ error: 'Unauthorized access ddd' });
        }
        
        const deletedPost = await Post.findByIdAndDelete(id)

        res.status(200).json({ message: "Post deleted successfully" })
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}