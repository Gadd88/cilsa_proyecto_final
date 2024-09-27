import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import libraryData from "../../../../books.json";

export const BooksView = () => {
  //estado de los botones de precio y fecha
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [recentFilter, setRecentFilter] = useState<string | null>(null);

  //estado para la lista de generos a la izquierda
  const [genres, setGenres] = useState<{ genre: string; count: number }[]>([]);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);

  const [isPriceDropdownOpen, setIsPriceDropdownOpen] =
    useState<boolean>(false);
  const [isRecentDropdownOpen, setIsRecentDropdownOpen] =
    useState<boolean>(false);

  useEffect(() => {
    // cuenta de libros por género
    const genreCount: { [key: string]: number } = {};

    libraryData.library.forEach((entry) => {
      const genre = entry.book.genre;
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    const sortedGenres = Object.entries(genreCount)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => a.count - b.count);

    setGenres(sortedGenres);
  }, []);

  const handlePriceFilterChange = (filter: string) => {
    setPriceFilter((prev) => (prev === filter ? null : filter));
    setIsPriceDropdownOpen(false);
  };

  const handleRecentFilterChange = (filter: string) => {
    setRecentFilter((prev) => (prev === filter ? null : filter));
    setIsRecentDropdownOpen(false);
  };

  return (
    <main className="h-full flex justify-between overflow-hidden">
      <section className="w-1/6 h-full flex flex-col py-2 px-4">
        <h1 className="text-xl">Género</h1>
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
            {libraryData.library.length}
          </li>
        </ul>
      </section>
      <div className="divider divider-horizontal m-0"></div>
      <section className="w-5/6 h-auto flex flex-col justify-start gap-5 py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="w-full flex justify-start items-center gap-8">
            <div className="relative h-full">
              <input
                placeholder="Search..."
                className="bg-transparent border border-neutral px-2 py-2 rounded-md w-80 h-12 outline-none"
                name="search"
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
                }}
              >
                <IoClose size={20} />
              </button>
            )}
          </div>
          <FaPlus size={26} className="cursor-pointer" />
        </div>
       
        <div className="grid grid-cols-4 gap-6 py-4 px-2 overflow-auto">
          {libraryData.library
            .filter((bookData) => {
              const book = bookData.book;
              
              if (genreFilter && book.genre !== genreFilter) {
                return false;
              }
              return true; 
            })
            .sort((a, b) => {
              const bookA = a.book;
              const bookB = b.book;
              
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
            })
            .map((bookData, index) => (
              <div
                key={index}
                className="w-full h-96 bg-cover bg-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                style={{ backgroundImage: `url(${bookData.book.cover})` }}
                title={bookData.book.title}
              />
            ))}
        </div>
      </section>
    </main>
  );
};
