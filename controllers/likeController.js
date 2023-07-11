import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";

export const addLike = async (req, res) => {
    try {
        const { postId, userId } = req.body

        //checking if the post exist
        const post = await Post.findById(postId)

        if(!post) {
            res.status(404).json({message: "Post not found"})
        }
        
        const like = new Like({
            postId,
            userId
        })

        await like.save()

        //Adding the like to post likes array
        post.likes.push(like)
        await post.save()

        res.status(201).json({message: "Like created ✅✅"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}
