import express from 'express'
import { getTasks, getTaskById, addTask, editTask, deleteTask } from '../controllers/task-controller';

const router = express.Router()


router.get('/tasks', getTasks)
router.post('/tasks', addTask)
router.get('/tasks/:id', getTaskById)
router.patch('/tasks/:id', editTask)
router.delete('/tasks/:id', deleteTask)

export default router