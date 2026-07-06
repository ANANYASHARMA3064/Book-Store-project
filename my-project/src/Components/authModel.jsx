import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { TbCompass } from 'react-icons/tb';
import { login, register, saveToken } from '../Services/authService';

const AuthModal = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const fn = mode === 'login' ? login : register;
      const data = await fn(email, password);
      saveToken(data.token);
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none"
    >
      <div
        className="pointer-events-auto w-full max-w-sm mx-4 p-8 rounded-2xl relative"
        style={{
          background: '#0f0f1a',
          border: '0.5px solid #2d2d5e',
          boxShadow: '0 0 0 1px #3b3b6b, 0 24px 48px rgba(124,58,237,0.15)',
        }}
      >
        <AiOutlineClose
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-lg"
          style={{ color: '#4b5580' }}
        />

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
            <TbCompass className="text-white text-xs" />
          </div>
          <span className="font-mono text-sm font-medium" style={{ color: '#e2e8f0' }}>
            opensource<span style={{ color: '#818cf8' }}>compass</span>
          </span>
        </div>

        {/* Heading */}
        <p className="font-mono text-lg font-medium" style={{ color: '#e2e8f0' }}>
          {mode === 'login' ? 'sign in' : 'create account'}
        </p>
        <p className="font-mono text-xs mt-1 mb-6" style={{ color: '#4b5580' }}>
          {mode === 'login' ? '$ auth --login' : '$ auth --register'}
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-4 rounded-lg font-mono text-sm outline-none"
            style={{
              background: '#1a1a2e',
              border: '0.5px solid #2d2d5e',
              color: '#e2e8f0',
            }}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = '#2d2d5e'}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full h-10 px-4 rounded-lg font-mono text-sm outline-none"
            style={{
              background: '#1a1a2e',
              border: '0.5px solid #2d2d5e',
              color: '#e2e8f0',
            }}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = '#2d2d5e'}
          />
        </div>

        {error && (
          <p className="font-mono text-xs mt-3" style={{ color: '#f87171' }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full h-10 rounded-lg font-mono text-sm font-medium text-white disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', border: 'none' }}
        >
          {loading ? 'loading...' : mode === 'login' ? 'sign in' : 'register'}
        </button>

        <p className="font-mono text-xs text-center mt-4" style={{ color: '#4b5580' }}>
          {mode === 'login' ? "no account? " : "have an account? "}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer' }}
            className="font-mono text-xs"
          >
            {mode === 'login' ? 'register' : 'sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;