import express from 'express'
import BooksRoutes from './books-routes';
import TasksRoutes from './tasks-routes'
import UsersRoutes from './users-routes'
import { login, register } from '../controllers/auth-controller';

const router = express.Router()

router.use('/', BooksRoutes)
router.use('/', TasksRoutes)
router.use('/', UsersRoutes)
router.post('/login', login)
router.post('/register', register)

export default router