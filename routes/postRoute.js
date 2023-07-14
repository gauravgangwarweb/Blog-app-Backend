import express from 'express'
import { createPost, getAllPost, getPostById, updatePost, deletePost } from '../controllers/postController.js'
import { addComment, deleteComment } from '../controllers/commentController.js'
import { addLike } from '../controllers/likeController.js'
import auth from '../auth.js'


const router = express.Router()

router.post('/post/new', auth, createPost)

router.get('/posts', getAllPost)

router.get('/post/:id', getPostById)

router.put('/post/:id', auth, updatePost)

router.delete('/post/:id', auth, deletePost)

//Comments routes
router.post('/post/comment', auth, addComment)

router.delete('/post/:postId/comment/:commentId', auth, deleteComment)

//Likes routes
router.post('/post/like', auth, addLike)

export default router