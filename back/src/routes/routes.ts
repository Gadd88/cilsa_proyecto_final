import express from 'express'
import BooksRoutes from './books-routes';
import TasksRoutes from './tasks-routes'

const router = express.Router()

router.use('/', BooksRoutes)
router.use('/', TasksRoutes)

export default router