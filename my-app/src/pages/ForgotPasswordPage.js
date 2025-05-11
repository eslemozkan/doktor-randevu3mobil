import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../config/supabase';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage('Şifre sıfırlama bağlantısı email adresinize gönderildi.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF5FB] to-white">
      <div className="absolute top-4 left-4">
        <Link 
          to="/login" 
          className="inline-flex items-center text-[#394C8C] hover:text-[#5A70B9] transition-colors group"
        >
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="mr-2 transform group-hover:-translate-x-1 transition-transform" 
          />
          <span>Giriş Sayfasına Dön</span>
        </Link>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[320px] px-4">
          <div className="bg-white rounded-xl shadow-lg p-5">
            <div className="text-center mb-5">
              <h1 className="text-lg font-bold text-[#1E2E62] mb-1">Şifremi Unuttum</h1>
              <p className="text-xs text-gray-600">Email adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                  Email Adresi
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#394C8C] focus:border-transparent text-sm"
                  placeholder="ornek@email.com"
                  required
                />
              </div>

              {message && (
                <div className="text-green-600 text-xs text-center">
                  {message}
                </div>
              )}

              {error && (
                <div className="text-red-500 text-xs text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-1.5 px-4 rounded-lg text-white font-medium text-sm
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#394C8C] hover:bg-[#5A70B9] transition-colors'
                  }`}
              >
                {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 