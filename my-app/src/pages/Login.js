import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../config/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/appointment');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF5FB] to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-[#394C8C] hover:text-[#5A70B9] transition-colors group mb-8"
          >
            <FontAwesomeIcon 
              icon={faArrowLeft} 
              className="mr-2 transform group-hover:-translate-x-1 transition-transform" 
            />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#1E2E62] mb-2">Giriş Yap</h1>
              <p className="text-gray-600">Hesabınıza giriş yaparak randevu alabilirsiniz.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Adresi
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#394C8C] focus:border-transparent"
                  placeholder="ornek@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#394C8C] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <div className="mt-2 text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-[#394C8C] hover:text-[#5A70B9] transition-colors"
                  >
                    Şifremi Unuttum
                  </Link>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#394C8C] focus:ring-[#394C8C] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Beni Hatırla
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#394C8C] hover:bg-[#5A70B9] transition-colors'
                  }`}
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Hesabınız yok mu?{' '}
                  <Link 
                    to="/register" 
                    className="text-[#394C8C] hover:text-[#5A70B9] font-medium transition-colors"
                  >
                    Kayıt Ol
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 