import { useState } from 'react';
import { TbCompass } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { FiLogIn } from 'react-icons/fi';

const Navbar = ({ onSearch, onSignIn, onLogout, user }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav style={{ background: '#0f0f1a', borderBottom: '0.5px solid #2a2a4a' }}
      className="sticky top-0 z-20 w-full px-5 flex items-center gap-4 h-14"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
          className="w-7 h-7 rounded-md flex items-center justify-center"
        >
          <TbCompass className="text-white text-sm" />
        </div>
        <span className="font-mono font-medium text-sm tracking-tight" style={{ color: '#e2e8f0' }}>
          opensource<span style={{ color: '#818cf8' }}>compass</span>
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-md relative">
        <BiSearch className="absolute left-2.5 text-sm" style={{ color: '#4b5580' }} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="react, typescript, node..."
          className="w-full h-9 pl-8 pr-3 rounded-lg font-mono text-xs outline-none"
          style={{
            background: '#1a1a2e',
            border: '0.5px solid #2d2d5e',
            color: '#e2e8f0',
          }}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 ml-auto">
        <a href="#" className="font-mono text-xs px-3 h-9 flex items-center rounded-md"
          style={{ color: '#94a3b8' }}>
          explore
        </a>
        <a href="#" className="font-mono text-xs px-3 h-9 flex items-center rounded-md"
          style={{ color: '#94a3b8' }}>
          saved
        </a>

        {user ? (
          <button onClick={onLogout}
            className="flex items-center gap-1.5 px-4 h-9 rounded-lg font-mono text-xs"
            style={{ border: '0.5px solid #7c3aed', color: '#818cf8' }}
          >
            sign out
          </button>
        ) : (
          <button onClick={onSignIn}
            className="flex items-center gap-1.5 px-4 h-9 rounded-lg font-mono text-xs font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', border: 'none' }}
          >
            <FiLogIn className="text-sm" />
            sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;