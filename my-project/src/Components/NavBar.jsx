import { useState } from 'react';
import { TbCompass } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { FiLogIn } from 'react-icons/fi';

const Navbar = ({ onSearch, onSignIn }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav className="sticky top-0 z-20 w-full bg-ink/95 backdrop-blur border-b border-border px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <TbCompass className="text-2xl text-add transition-transform duration-500 hover:rotate-180" />
        <span className="font-mono font-semibold text-text tracking-tight">
          OpenSource<span className="text-add">Compass</span>
        </span>
      </div>

      <div
        className={`flex items-center gap-2 bg-panel border rounded-lg px-3 py-2 w-full max-w-md transition-colors ${
          focused ? 'border-add shadow-[0_0_0_3px_rgba(88,199,123,0.15)]' : 'border-border'
        }`}
      >
        <BiSearch className="text-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search by tech stack — react, rust, python..."
          className="bg-transparent outline-none text-sm text-text placeholder:text-muted/70 w-full font-mono"
        />
      </div>

      <button
        onClick={onSignIn}
        className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-text hover:border-add hover:text-add transition-colors font-mono text-sm shrink-0"
      >
        <FiLogIn />
        Sign In
      </button>
    </nav>
  );
};

export default Navbar;