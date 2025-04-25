import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Giriş kontrolü
      if (formData.email === 'test@test.com' && formData.password === '123456') {
        console.log('Giriş başarılı');
        navigate('/appointment');
      } else {
        alert('E-posta veya şifre hatalı!');
      }
    } else {
      // Kayıt işlemi
      console.log('Kayıt olunuyor:', formData);
      navigate('/appointment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF5FB] to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1E2E62]">
            {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin 
              ? 'Randevu oluşturmak için giriş yapın' 
              : 'Yeni hesap oluşturarak randevu alabilirsiniz'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <FontAwesomeIcon 
                icon={faUser} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ad Soyad"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#394C8C]"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-posta"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#394C8C]"
              required
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faLock} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Şifre"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#394C8C]"
              required
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <FontAwesomeIcon 
                icon={faLock} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Şifre Tekrar"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#394C8C]"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#394C8C] text-white py-3 rounded-lg font-semibold hover:bg-[#2C3A6A] transition-colors"
          >
            {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#394C8C] hover:text-[#2C3A6A] transition-colors"
            >
              {isLogin 
                ? 'Hesabınız yok mu? Hesap oluşturun' 
                : 'Zaten hesabınız var mı? Giriş yapın'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
