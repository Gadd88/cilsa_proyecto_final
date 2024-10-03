import { useContext, useRef, useState, useEffect, useMemo } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { BookContext } from "../../context";

export const BooksView = () => {
  const {
    books,
    selectedBook,
    setSelectedBook,
    priceFilter,
    setPriceFilter,
    recentFilter,
    setRecentFilter,
    genreFilter,
    setGenreFilter,
  } = useContext(BookContext)!;

  const [genres, setGenres] = useState<{ genre: string; count: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  useEffect(() => {
    // cuenta de libros por género
    const genreCount: { [key: string]: number } = {};

    books.forEach((book) => {
      const genre = book.genre;
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    const sortedGenres = Object.entries(genreCount)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => a.count - b.count);

    setGenres(sortedGenres);
  }, [books]);

  const handlePriceFilterChange = (filter: string) => {
    setPriceFilter(filter === priceFilter ? null : filter);
    // setIsPriceDropdownOpen(false);
  };

  const handleRecentFilterChange = (filter: string) => {
    setRecentFilter(filter === recentFilter ? null : filter);
    // setIsRecentDropdownOpen(false);
  };

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (genreFilter && book.genre !== genreFilter) return false;
        if (
          searchTerm &&
          !(
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const bookA = a;
        const bookB = b;

        let priceComparison = 0;
        if (priceFilter === "menor") {
          priceComparison = bookA.price - bookB.price;
        } else if (priceFilter === "mayor") {
          priceComparison = bookB.price - bookA.price;
        }

        if (priceComparison === 0) {
          if (recentFilter === "mas") {
            return bookB.year - bookA.year;
          } else if (recentFilter === "menos") {
            return bookA.year - bookB.year;
          }
        }

        return priceComparison;
      });
  }, [books, genreFilter, searchTerm, priceFilter, recentFilter]);

  return (
    <main className="h-full flex flex-col lg:flex-row justify-between overflow-auto lg:overflow-hidden">
      <section className="w-full lg:w-1/6 h-auto lg:h-full flex-col py-2 px-4 hidden lg:flex">
        <h1 className="text-xl">Géneros</h1>
        <div className="divider my-2"></div>
        <ul className="text-sm flex flex-col gap-2 [&>li]:cursor-pointer">
          {genres.map((genre, index) => (
            <li
              key={index}
              className="flex w-full justify-between items-center hover:scale-105 transition-all hover:text-primary"
              onClick={() => setGenreFilter(genre.genre)}
            >
              {genre.genre}
              <span className="divider flex-grow mx-4 my-0 h-full"></span>
              {genre.count}
            </li>
          ))}
          <li
            className="flex w-full justify-between items-center hover:scale-105 transition-all hover:text-primary"
            onClick={() => setGenreFilter(null)}
          >
            Todos los libros
            <span className="divider flex-grow mx-4 my-0 h-full"></span>
            {books.length}
          </li>
        </ul>
      </section>

      <div className="divider divider-horizontal border border-neutral hidden md:block m-0 w-0 my-2"></div>

      <section className="w-full lg:w-5/6 h-auto flex flex-col justify-start gap-5 py-2 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-[33rem] h-12">
            <input
              placeholder="Buscar por nombre, género, autor..."
              className="bg-transparent border border-neutral px-2 py-2 rounded-md w-full h-12 outline-none"
              name="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaMagnifyingGlass className="absolute top-4 right-3 cursor-pointer" />
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Filtro de generos para telefonos */}
            <div className="flex-grow md:flex-1">
              <select
                className="select select-bordered border-neutral w-full max-w-xs lg:hidden"
                value={genreFilter || ""}
                onChange={(e) => setGenreFilter(e.target.value)}
              >
                <option disabled value="">
                  Selecciona un género
                </option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre.genre}>
                    {genre.genre} ({genre.count})
                  </option>
                ))}
                <option value={""}>Todos los libros ({books.length})</option>
              </select>
            </div>

            {/* Filtro de Precio */}
            <div className="flex-grow md:flex-1">
              <select
                className="select select-bordered border-neutral w-full max-w-xs"
                value={priceFilter || ""}
                onChange={(e) => handlePriceFilterChange(e.target.value)}
              >
                <option disabled value="">
                  Precio
                </option>
                <option
                  value="menor"
                  className={priceFilter === "menor" ? "font-semibold" : ""}
                >
                  Menor Precio
                </option>
                <option
                  value="mayor"
                  className={priceFilter === "mayor" ? "font-semibold" : ""}
                >
                  Mayor Precio
                </option>
              </select>
            </div>

            {/* Filtro de Fecha */}
            <div className="flex-grow md:flex-1">
              <select
                className="select select-bordered border-neutral w-full max-w-xs"
                value={recentFilter || ""}
                onChange={(e) => handleRecentFilterChange(e.target.value)}
              >
                <option disabled value="">
                  Fecha
                </option>
                <option
                  value="menos"
                  className={recentFilter === "menos" ? "font-semibold" : ""}
                >
                  {recentFilter === "menos" && (
                    <FaCheck className="inline mr-2" />
                  )}{" "}
                  Menos Recientes
                </option>
                <option
                  value="mas"
                  className={recentFilter === "mas" ? "font-semibold" : ""}
                >
                  {recentFilter === "mas" && (
                    <FaCheck className="inline mr-2" />
                  )}{" "}
                  Más Recientes
                </option>
              </select>
            </div>
            {(priceFilter || recentFilter || genreFilter) && (
              <button
                className="badge border-neutral h-12 py-2 flex items-center rounded-md cursor-pointer"
                onClick={() => {
                  setPriceFilter(null);
                  setRecentFilter(null);
                  setGenreFilter("");
                }}
              >
                <IoClose size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Grid de libros responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-2 overflow-auto sm:px-24 md:pr-6 md:px-0">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="w-full h-96 bg-cover bg-no-repeat bg-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${book.cover})` }}
              title={book.title}
              onClick={() => {
                setSelectedBook(book);
                openModal();
              }}
            />
          ))}
        </div>

        {/* Modal responsive */}
        <dialog id="my_modal_3" ref={modalRef} className="modal h-full w-full">
          <div className="modal-box max-w-full lg:max-w-2xl">
            <button
              className="btn btn-sm btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 flex justify-center items-center">
                <img
                  src={selectedBook?.cover}
                  alt={`Cover of ${selectedBook?.title}`}
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-2/3 text-left">
                <h2 className="text-2xl font-bold mb-5">
                  {selectedBook?.title}
                </h2>
                <p className="text-sm mb-3">{selectedBook?.synopsis}</p>
                <div className="sm:grid sm:grid-cols-2 md:flex md:flex-col">
                  <p className="text-sm mb-3 col-span-1">
                    <span className="font-semibold">Autor:</span>{" "}
                    {selectedBook?.author}
                  </p>
                  <p className="text-sm mb-3 col-span-1">
                    <span className="font-semibold">Género:</span>{" "}
                    {selectedBook?.genre}
                  </p>
                  <p className="text-sm mb-3 col-span-1">
                    <span className="font-semibold">Publicado en :</span>{" "}
                    {selectedBook?.year}
                  </p>
                  <p className="text-sm mb-3 col-span-1">
                    <span className="font-semibold">Precio:</span> ${" "}
                    {selectedBook?.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </section>
    </main>
  );
};
