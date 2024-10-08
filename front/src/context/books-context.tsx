import { createContext, ReactNode, useState, useEffect } from "react";

type Book = {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  price: number;
  author: string;
}

type BookContextProps = {
  books: Book[];
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  priceFilter: string | null;
  setPriceFilter: (filter: string | null) => void;
  recentFilter: string | null;
  setRecentFilter: (filter: string | null) => void;
  genreFilter: string | null;
  setGenreFilter: (filter: string | null) => void;
}

export const BookContext = createContext<BookContextProps | null>(null!);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [recentFilter, setRecentFilter] = useState<string | null>(null);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([])

  // traer los libros de la base de datos :)
  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/books`);
      if(!response.ok){
        throw new Error("Error al traer los libros");
      }
      const data: Book[] = await response.json();
      setBooks(data)
    } catch (error) {
      console.log("Un error del fetch: ", error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []) // ejecuta la funcion que trae los libros cuando se inicia el componente :)

  return (
    <BookContext.Provider
      value={{
        books,
        selectedBook,
        setSelectedBook,
        priceFilter,
        setPriceFilter,
        recentFilter,
        setRecentFilter,
        genreFilter,
        setGenreFilter,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
