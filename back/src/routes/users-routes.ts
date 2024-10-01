import express from 'express'
import { getUsers, getOneUser, addUser, editUser, deleteUser } from '../controllers/user-controller';

const router = express.Router()


router.get('/users', getUsers)
router.get('/users/:id', getOneUser)
router.patch('/users/:id', editUser)
router.delete('/users/:id', deleteUser)
router.post('/users', addUser)

export default router