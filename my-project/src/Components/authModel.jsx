import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { login, register, saveToken } from '../Services/authService';

const AuthModal = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
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
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-panel border border-border rounded-xl p-6 relative"
      >
        <AiOutlineClose
          className="absolute right-5 top-5 text-muted hover:text-text cursor-pointer"
          onClick={onClose}
        />

        <h2 className="font-mono text-lg text-text mb-1">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </h2>
        <p className="text-xs text-muted font-mono mb-6">
          {mode === 'login' ? '$ auth --login' : '$ auth --register'}
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-ink border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-muted outline-none focus:border-add font-mono"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="bg-ink border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-muted outline-none focus:border-add font-mono"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 font-mono mt-3">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full py-2.5 bg-add text-ink font-mono text-sm rounded-lg hover:bg-add-dim transition-colors disabled:opacity-50"
        >
          {loading ? 'loading...' : mode === 'login' ? 'sign in' : 'register'}
        </button>

        <p className="text-xs text-muted font-mono text-center mt-4">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-add hover:underline"
          >
            {mode === 'login' ? 'Register' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;