import express from 'express'
import { createUser, updateUser, login, getUserById } from '../controllers/userController.js'
import auth from '../auth.js';


const router = express.Router();

router.post('/user/new', createUser)

router.put('/user/:userId', updateUser)

router.post('/login', login)

router.get('/user/:userId', auth, getUserById)

export default router