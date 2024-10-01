import { Response, Request } from "express";
import { addOneBook, deleteOneBook, editOneBook, findAllBooks, findOneBook } from "../services/book-services";

const getBooks = async (req: Request, res: Response) => {
    const result = await findAllBooks();
    if(result.status !== 200) return res.status(404).json({message: 'Ocurrió un error'});
    return res.json(result.books);
}

const getBookById = async (req: Request, res:Response) => {
    const result = await findOneBook(req.params.id);
    if(result.status !== 200) return res.status(404).json({message: 'No se encuentra el libro'});
    res.status(200).json(result.book)
}

const addBook = async (req: Request, res: Response) => {
    const bookData = req.body;
    const result = await addOneBook(bookData);
    if(result.status !== 201) return res.status(500).json({message: "Ocurrió un error al agregar el libro"})
    const newBook = {...result.newBook}
    return res.json({message: 'Libro agregado', newBook});
}

const editBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const bookdData = req.body;
    const result = await editOneBook(bookdData, bookId); 
    if(result.status !== 200) return res.status(404).json({message: 'Ocurrió un error'});
    const editedBook = result.book
    return res.json({message: 'Libro actualizado', editedBook });
}

const deleteBook = async (req: Request, res:Response) => {
    const bookId = req.params.id;
    const result = await deleteOneBook(bookId);
    if(result.status !== 200) return res.status(404).json({message: 'No se encontró el libro a eliminar'});
    return res.json({message: 'Libro eliminado'});
}

export { getBooks, addBook, getBookById, editBook, deleteBook }