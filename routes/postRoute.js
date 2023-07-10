import express from 'express'
import { createPost, getAllPost, getPostById, updatePost, deletePost } from '../controllers/postController.js'

const router = express.Router()

router.post('/post/new', createPost)

router.get('/posts', getAllPost)

router.get('/post/:id', getPostById)

router.put('/post/:id', updatePost)

router.delete('/post/:id', deletePost)

export default router