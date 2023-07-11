import express from 'express'
import { createPost, getAllPost, getPostById, updatePost, deletePost } from '../controllers/postController.js'
import { addComment } from '../controllers/commentController.js'
import { addLike } from '../controllers/likeController.js'


const router = express.Router()

router.post('/post/new', createPost)

router.get('/posts', getAllPost)

router.get('/post/:id', getPostById)

router.put('/post/:id', updatePost)

router.delete('/post/:id', deletePost)

//Comments routes
router.post('/post/comment', addComment)

router.delete('/post/:postId/comment/:commentId', deletePost)

//Likes routes
router.post('/post/like', addLike)

export default router