import { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav className="w-full bg-sky-600 p-4 flex items-center justify-between">
      <h1 className="text-white text-xl font-bold">📚 BookStore</h1>

      <input
        type="text"
        placeholder="Search by title, author, genre..."
        value={query}
        onChange={handleChange}
        className="px-4 py-2 rounded-md w-72 outline-none"
      />
    </nav>
  );
};

export default Navbar;
