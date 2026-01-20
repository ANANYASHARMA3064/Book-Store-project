import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import BooksCard from "../Components/Home/BooksCard";
import BooksTable from "../Components/Home/BooksTable";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8090/books")
      .then((response) => {
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    const lower = query.toLowerCase();

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(lower) ||
      book.author.toLowerCase().includes(lower) ||
      book.genre.toLowerCase().includes(lower)
    );

    setFilteredBooks(filtered);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="p-4">
        <div className="flex justify-center items-center gap-x-4 mb-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>

          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BooksTable books={filteredBooks} />
        ) : (
          <BooksCard books={filteredBooks} />
        )}
      </div>
    </>
  );
};

export default Home;
