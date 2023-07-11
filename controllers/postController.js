import { Model } from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

//Create new post
export const createPost = async (req, res) => {
    try {
        const {title, publicId, imageUrl, userId, body} = req.body

        //check if the user exist
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: "User does not exiat"})
        }

        const post = await Post.create({title, publicId, imageUrl, userId, body})
        res.status(201).json({message: "Post created🎉🎉"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//get all post
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//get a single post by ID
export const getPostById = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)


        if(!post) {
            res.status(404).json({error: "Post not found"})
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//Update post
export const updatePost = async (req, res) => {
    try{
        const {postId} = req.params
        const updatedData = req.body
        const options = {new: true}

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(201).json({message: "Post updated"})
    } catch (error) {
        res.status(500).json({message: error})
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
        
        if (String(post.userId) !== req.body.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" })
        }
        const deletedPost = await Post.findByIdAndDelete(id)

        res.status(200).json({ message: "Post deleted successfully" })
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}