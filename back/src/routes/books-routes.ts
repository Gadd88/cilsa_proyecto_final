import express from 'express'
import { addBook, deleteBook, editBook, getBookById, getBooks } from '../controllers/book-controller'

const router = express.Router()


router.get('/books', getBooks)
router.post('/books', addBook)
router.get('/books/:id', getBookById)
router.patch('/books/:id', editBook)
router.delete('/books/:id', deleteBook)

export default router