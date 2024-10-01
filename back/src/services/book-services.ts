import BookModel from "../models/book-model";

export type BookType = {
    title: string,
    pages: number,
    genre: string,
    cover: string,
    synopsis: string,
    year: number,
    ISBN: string,
    price: number,
    author: string
}

export const findAllBooks = async () => {
    const books = await BookModel.find();
    return {
        status: 200,
        books
    }
}

export const findOneBook = async (id: string) => {
    const book = await BookModel.findById(id);
    if(!book) return {
        status: 404
    };
    return {
        status: 200,
        book
    }
}

export const editOneBook = async (bookData: BookType, bookId: string) => {
    const { title, pages, genre, cover, synopsis, year, ISBN, price, author } = bookData;
    const book = await BookModel.findByIdAndUpdate(bookId, { title, pages, genre, cover, synopsis, year, ISBN, price, author });
    return {
        status: 200,
        book
    }
}

export const addOneBook = async (bookData: BookType) => {
    const { title, pages, genre, cover, synopsis, year, ISBN, price, author } = bookData;
    const newBook = new BookModel({ title, pages, genre, cover, synopsis, year, ISBN, price, author });
    await newBook.save();
    return {
        status: 201,
        newBook
    }
}

export const deleteOneBook = async (bookId: string) => {
    const book = await BookModel.findByIdAndDelete(bookId);
    return {
        status: 200
    }
}