import { createContext, ReactNode, useState } from "react";
import libraryData from "../../../books.json";

interface Author {
  name: string;
  otherBooks: string[];
}

interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  price: number;
  author: Author;
}

interface BookContextProps {
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
  const books: Book[] = libraryData.library.map((entry) => entry.book);

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
