import express from 'express'
import { createUser, updateUser, login, getUserById } from '../controllers/userController'
import auth from '../auth';

const router = express.Router();

router.post('/user/new', createUser)

router.put('/user/:userId', updateUser)

router.post('/login', login)

router.get('/user/:userId', auth, getUserById)

export default router