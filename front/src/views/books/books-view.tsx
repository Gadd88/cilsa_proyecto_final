import { useContext, useRef, useState, useEffect, useMemo } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
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
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState<boolean>(false);
  const [isRecentDropdownOpen, setIsRecentDropdownOpen] = useState<boolean>(false);

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
    setIsPriceDropdownOpen(false);
  };

  const handleRecentFilterChange = (filter: string) => {
    setRecentFilter(filter === recentFilter ? null : filter);
    setIsRecentDropdownOpen(false);
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
            book.author.name.toLowerCase().includes(searchTerm.toLowerCase()) 
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
    <main className="h-full flex justify-between overflow-hidden">
      <section className="w-1/6 h-full flex flex-col py-2 px-4">
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
      <div className="divider divider-horizontal m-0"></div>
      <section className="w-5/6 h-auto flex flex-col justify-start gap-5 py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="w-full flex justify-start items-center gap-8">
            <div className="relative h-full">
              <input
                placeholder="Buscar por nombre, género, autor..."
                className="bg-transparent border border-neutral px-2 py-2 rounded-md w-80 h-12 outline-none"
                name="search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaMagnifyingGlass className="absolute top-4 right-3 cursor-pointer" />
            </div>

            <div className="relative dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost h-8 flex gap-4 border border-neutral"
                onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
              >
                Precio
                <span className="divider divider-vertical border border-neutral"></span>
                {!priceFilter && <FaCirclePlus />}
                {priceFilter && (
                  <p className="badge border-neutral py-3 rounded-md">
                    {priceFilter === "menor" ? "Menor Precio" : "Mayor Precio"}
                  </p>
                )}
              </div>
              {isPriceDropdownOpen && (
                <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 py-2 px-0 shadow absolute top-full">
                  <li>
                    <label className="flex items-center justify-evenly cursor-pointer px-0">
                      <p>Menor Precio</p>
                      <input
                        type="checkbox"
                        checked={priceFilter === "menor"}
                        onChange={() => handlePriceFilterChange("menor")}
                      />
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center justify-evenly cursor-pointer  px-0">
                      <p>Mayor Precio</p>
                      <input
                        type="checkbox"
                        checked={priceFilter === "mayor"}
                        onChange={() => handlePriceFilterChange("mayor")}
                      />
                    </label>
                  </li>
                </ul>
              )}
            </div>

            <div className="relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost h-8 border flex gap-4 border-neutral"
                onClick={() => setIsRecentDropdownOpen(!isRecentDropdownOpen)}
              >
                Fecha
                <span className="divider divider-vertical border border-neutral"></span>
                {!recentFilter && <FaCirclePlus />}
                {recentFilter && (
                  <p className="badge border-neutral py-3 rounded-md">
                    {recentFilter === "menos"
                      ? "Menos Recientes"
                      : "Más Recientes"}
                  </p>
                )}
              </div>
              {isRecentDropdownOpen && (
                <ul className="dropdown-content menu bg-base-100 rounded-b-lg z-[1] w-36 pt-2 px-0 shadow absolute top-full">
                  <li>
                    <label className="flex items-center justify-evenly cursor-pointer px-0">
                      <p>Menos Recientes</p>
                      <input
                        type="checkbox"
                        checked={recentFilter === "menos"}
                        onChange={() => handleRecentFilterChange("menos")}
                      />
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center justify-evenly cursor-pointer px-0">
                      <p>Más Recientes</p>
                      <input
                        type="checkbox"
                        checked={recentFilter === "mas"}
                        onChange={() => handleRecentFilterChange("mas")}
                      />
                    </label>
                  </li>
                </ul>
              )}
            </div>

            {(priceFilter || recentFilter) && (
              <button
                className="badge border-neutral h-8 py-2 flex items-center rounded-md cursor-pointer"
                onClick={() => {
                  setPriceFilter(null);
                  setRecentFilter(null);
                  setIsPriceDropdownOpen(false);
                  setIsRecentDropdownOpen(false);
                }}
              >
                <IoClose size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 py-4 px-2 overflow-auto">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="w-full h-96 bg-cover bg-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${book.cover})` }}
              title={book.title}
              onClick={() => {
                setSelectedBook(book);
                openModal();
              }}
            />
          ))}
        </div>
        {/* Modal */}
        <dialog id="my_modal_3" ref={modalRef} className="modal h-full w-full">
          <div className="modal-box max-w-2xl">
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
                {/* Título del libro */}
                <h2 className="text-2xl font-bold mb-5">
                  {selectedBook?.title}
                </h2>

                {/* Autor */}
                <p className="text-sm mb-3">
                  <span className="font-semibold">Author:</span>{" "}
                  {selectedBook?.author?.name}
                </p>

                {/* Sinopsis */}
                <p className="text-base italic mb-5">
                  {selectedBook?.synopsis}
                </p>

                <div className="gap-5">
                  {/* Género */}
                  <p className="text-sm mb-3">
                    <span className="font-semibold">Género:</span>{" "}
                    {selectedBook?.genre}
                  </p>
                </div>

                <p className="text-sm mb-3">
                  <span className="font-semibold">ISBN:</span>{" "}
                  {selectedBook?.ISBN}
                </p>

                {/* Páginas y Año */}
                <p className="text-sm mb-3">
                  <span className="font-semibold">
                    Cant. Páginas: {selectedBook?.pages}{" "}
                  </span>
                </p>

                <p className="mb-3">
                  <span className="font-semibold">
                    Publicación: {selectedBook?.year}
                  </span>
                </p>

                {/* Cod ISBN */}

                {/* Stock y precio */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold text-right">
                    {" "}
                    Precio:
                    {selectedBook?.price
                      ? ` $${selectedBook?.price.toFixed(2)}`
                      : "Price not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </section>
    </main>
  );
};
