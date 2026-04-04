import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import SignupModal from './SignupModal';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToAdmin: () => void;
}

export default function LoginModal({ onClose, onSwitchToAdmin }: LoginModalProps) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      onClose();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  if (showSignup) {
    return (
      <SignupModal
        onClose={onClose}
        onSwitchToLogin={() => setShowSignup(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative shadow-2xl transform transition-all duration-300 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sign in to your account to continue
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              minLength={6}
            />
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToAdmin}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Switch to admin sign-in
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => setShowSignup(true)}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
