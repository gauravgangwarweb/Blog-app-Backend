import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";


//Add a comment to the post
export const addComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body

        //checking if the post exist
        const post = await Post.findById(postId)
        if(!post) {
            return res.status(404).json({error: "Post not found"})
        }

        const comment = new Comment({
            postId,
            userId,
            content
        })

        await comment.save()

        //adding the comment to post comments array
        post.comments.push(comment)
        await post.save()
        res.status(201).json({message: "Comment created ✔️✔️"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

//delete comment
const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params
        const { userId } = req.body

        //checking if the post exist
        const post = await Post.findById(postId)
        if(!post) {
            return res.status(404).json({message: "Post not found"})
        }

        //Check if the comment exist
        const comment = await Comment.findById(commentId)
        if(!comment) {
            return res.status(404).json({message: "Comment not found"})
        }

        //check if the user is owner of comment
        if(comment.userId.toString() !== userId) {
            return res.status(401).json({message: "You are not authorized to delete this comment"})
        }

        //removing the comment from post array
        const commentIndex = post.comments.findIndex(c => c._id.toString() === commentId)
        if(commentIndex !== -1) {
            post.comments.splice(commentIndex, 1)
            await post.save()
        }

        await Comment.findByIdAndRemove(commentId);

        res.status(200).json({message: "Comment deleted ✅"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}