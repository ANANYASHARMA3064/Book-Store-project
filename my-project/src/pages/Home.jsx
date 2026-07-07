import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import BooksCard from "../Components/Home/BooksCard";
import BooksTable from "../Components/Home/BooksTable";
import Navbar from "../Components/NavBar";
import AuthModal from "../Components/authModel";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

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
    <div style={{ background: '#0a0a14', minHeight: '100vh' }}>
      <Navbar
        onSearch={handleSearch}
        onSignIn={() => setShowAuth(true)}
        user={user}
        onLogout={() => setUser(null)}
      />

      <div className="p-4">
        {/* View toggle */}
        <div className="flex justify-center items-center gap-x-3 my-6">
          <button
            onClick={() => setShowType("table")}
            style={{
              background: showType === 'table'
                ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
                : 'transparent',
              border: '0.5px solid',
              borderColor: showType === 'table' ? 'transparent' : '#2d2d5e',
              color: showType === 'table' ? '#fff' : '#94a3b8',
            }}
            className="px-5 py-1.5 rounded-lg font-mono text-sm transition-all"
          >
            table
          </button>
          <button
            onClick={() => setShowType("card")}
            style={{
              background: showType === 'card'
                ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
                : 'transparent',
              border: '0.5px solid',
              borderColor: showType === 'card' ? 'transparent' : '#2d2d5e',
              color: showType === 'card' ? '#fff' : '#94a3b8',
            }}
            className="px-5 py-1.5 rounded-lg font-mono text-sm transition-all"
          >
            card
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

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={(data) => { setUser(data); setShowAuth(false); }}
        />
      )}
    </div>
  );
};

export default Home;