import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeartPulse, faNotesMedical, faDisease, faStethoscope, faArrowRight, faCalendarAlt, faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import Videos from './Videos';
import About from './components/About';
import AboutDetail from './pages/AboutDetail';
import AllVideosPage from './pages/AllVideosPage';
import AllBlogPage from './pages/AllBlogPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AppointmentFormPage from './pages/AppointmentFormPage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { supabase } from './config/supabase';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';
import BlogModal from './components/BlogModal';

// Font Awesome kütüphanesini başlat
library.add(fab);
library.add(
  faHeartPulse, 
  faNotesMedical, 
  faDisease, 
  faStethoscope, 
  faArrowRight,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faPlay
);

// Özel kartlar için veri
const specialtyCards = [
  { 
    icon: faDisease, 
    title: 'Diyabet', 
    description: 'Diyabet tedavisi ve yönetimi' 
  },
  { 
    icon: faStethoscope, 
    title: 'Tiroid', 
    description: 'Tiroid bezi hastalıkları' 
  },
  { 
    icon: faHeartPulse, 
    title: 'Metabolik', 
    description: 'Metabolik hastalıklar' 
  },
  { 
    icon: faNotesMedical, 
    title: 'Hormon', 
    description: 'Hormon dengesi ve tedavisi' 
  }
];

function App() {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogError, setBlogError] = useState(null);
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });
        console.log('Supabase data:', data);
        if (error) {
          console.error('Supabase error:', error);
        }
        setVideos(data);
      } catch (error) {
        console.error('Catch error:', error);
        setVideoError(error.message);
      } finally {
        setLoadingVideos(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('id', { ascending: false });
        if (error) setBlogError(error.message);
        setBlogs(data);
      } catch (err) {
        setBlogError(err.message);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  const handlePrevBlog = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex === 0 ? blogs.length - 1 : prevIndex - 1));
  };

  const handleNextBlog = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex === blogs.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  const getVisibleBlogs = () => {
    return [
      blogs[currentBlogIndex],
      blogs[(currentBlogIndex + 1) % blogs.length],
      blogs[(currentBlogIndex + 2) % blogs.length]
    ];
  };

  const getVisibleVideos = () => {
    if (videos.length === 0) return [];
    return [
      videos[currentVideoIndex],
      videos[(currentVideoIndex + 1) % videos.length],
      videos[(currentVideoIndex + 2) % videos.length]
    ];
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section className="relative bg-[#EFF5FB] py-16 w-full">
              <div className="container mx-auto px-4 w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-[2px] w-8 md:w-16 bg-[#394C8C]"></div>
                      <h2 className="text-[#394C8C] text-base md:text-lg font-medium">
                      Endokrinoloji ve Metabolizma Hastalıkları Uzmanı
                    </h2>
                      <div className="h-[2px] w-8 md:w-16 bg-[#394C8C]"></div>
                  </div>
                    <h1 className="text-[#1E2E62] text-3xl md:text-5xl font-bold leading-tight">
                    Prof. Dr. Yusuf Özkan
                  </h1>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Diyabet (Şeker) Hastalığı, Tiroid Bezi Hastalıkları, Hipertansiyon 
                    (Yüksek Tansiyon), Yağ metabolizması ile ilgili hastalıklar (yüksek 
                    kolesterol), Obezite, Metabolik bozukluklar ve daha fazlası...
                  </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <a 
                      href="#appointment" 
                        className="bg-[#394C8C] text-white px-8 py-3 md:px-10 md:py-4 rounded-full 
                                 font-semibold hover:bg-opacity-90 transition-colors 
                                   shadow-lg hover:shadow-xl text-center"
                    >
                      Randevu Al
                    </a>
                    <a 
                      href="#about" 
                        className="border-2 border-[#394C8C] text-[#394C8C] px-6 py-2 md:px-8 md:py-3 rounded-full 
                                   font-semibold hover:bg-[#394C8C] hover:text-white transition-colors 
                                   shadow-lg hover:shadow-xl text-center text-xs md:text-sm"
                    >
                      Hakkımda
                    </a>
                  </div>
                </div>
                  <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
                  {specialtyCards.map((card, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
                                transform transition-all duration-300 hover:-translate-y-2
                                border-2 border-transparent hover:border-[#394C8C]"
                    >
                      <div className="text-[#394C8C] text-4xl mb-4 flex justify-center">
                        <FontAwesomeIcon icon={card.icon} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1E2E62] text-center mb-3">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-center">
                        {card.description}
                      </p>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full">
              <About />
            </section>

            {/* Videos Section */}
            <section className="py-20 bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB] w-full">
              <div className="container mx-auto px-4 w-full">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#1E2E62]">Videolar</h2>
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                  </div>
                  <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Sağlık ve beslenme hakkında eğitici videolar
                  </p>
                </div>
                {loadingVideos ? (
                  <div className="text-center text-[#1E2E62]">Yükleniyor...</div>
                ) : videoError ? (
                  <div className="text-center text-red-500">Hata: {videoError}</div>
                ) : (
                  <div className="relative">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      loop={true}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                      }}
                      className="py-8"
                    >
                      {videos.map((video) => (
                        <SwiperSlide key={video.id}>
                          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-[250px] mx-auto">
                            <div className="relative aspect-video">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <button 
                                onClick={() => window.open(video.url, '_blank')}
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                                <FontAwesomeIcon 
                                  icon={faPlay} 
                                  className="text-white text-3xl transform hover:scale-110 transition-transform"
                                />
                  </button>
                            </div>
                            <div className="p-3">
                              <h3 className="text-base font-semibold text-[#1E2E62] line-clamp-2">
                                {video.title}
                              </h3>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => navigate('/videos')}
                    className="group flex items-center space-x-3 bg-[#394C8C] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#5A70B9] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Tüm Videolar</span>
                            <FontAwesomeIcon 
                              icon={faArrowRight} 
                              className="transform transition-transform group-hover:translate-x-1"
                            />
                          </button>
                        </div>
                      </div>
            </section>
            
            {/* Blog Section */}
            <section id="blog" className="py-20 bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB] w-full">
              <div className="container mx-auto px-4 w-full">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#1E2E62]">Blog Yazıları</h2>
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                  </div>
                  <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Sağlık, beslenme ve yaşam kalitesi hakkında güncel bilgiler
                  </p>
                </div>

                {loadingBlogs ? (
                  <div className="text-center text-[#1E2E62]">Yükleniyor...</div>
                ) : blogError ? (
                  <div className="text-center text-red-500">Hata: {blogError}</div>
                ) : (
                  <div className="relative">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      loop={true}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                      }}
                      className="py-8"
                    >
                      {blogs.map((post) => (
                        <SwiperSlide key={post.id}>
                          <div
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-[250px] mx-auto cursor-pointer"
                            onClick={() => setSelectedBlog(post)}
                          >
                            <div className="relative aspect-video">
                              <img 
                                src={post.image_url} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-3">
                              <h3 className="text-base font-semibold text-[#1E2E62] line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {post.content}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => navigate('/blog')}
                    className="group flex items-center space-x-3 bg-[#394C8C] text-white 
                               px-8 py-4 rounded-full font-semibold hover:bg-[#5A70B9] 
                               transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Tüm Blog Yazıları</span>
                    <FontAwesomeIcon 
                      icon={faArrowRight} 
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Social Media & Appointment Section */}
            <section id="appointment" className="py-16 bg-[#EFF5FB] w-full">
              <div className="container mx-auto px-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="bg-[#394C8C] rounded-[31px] p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center">
                        <FontAwesomeIcon icon={['fab', 'share-alt']} className="mr-4" /> 
                        Sosyal Medya Hesaplarımız
                      </h2>
                      <div className="space-y-4">
                        <a 
                          href="https://facebook.com/profdr.yusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        className="w-full bg-[#5A70B9] text-white py-3 md:py-4 px-4 md:px-6 rounded-[17px] font-bold text-left flex items-center 
                                   transition-all duration-300 hover:bg-blue-600 group text-sm md:text-base"
                        >
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform" /> 
                          Facebook Sayfamız
                        </a>
                        <a 
                          href="https://twitter.com/profdr_yusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        className="w-full bg-[#5A70B9] text-white py-3 md:py-4 px-4 md:px-6 rounded-[17px] font-bold text-left flex items-center 
                                   transition-all duration-300 hover:bg-blue-400 group text-sm md:text-base"
                        >
                        <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform" /> 
                          Twitter Hesabımız
                        </a>
                        <a 
                          href="https://instagram.com/profdr.yusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        className="w-full bg-[#5A70B9] text-white py-3 md:py-4 px-4 md:px-6 rounded-[17px] font-bold text-left flex items-center 
                                   transition-all duration-300 hover:bg-pink-600 group text-sm md:text-base"
                        >
                        <FontAwesomeIcon icon={['fab', 'instagram']} className="mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform" /> 
                          Instagram Sayfamız
                        </a>
                        <a 
                          href="https://linkedin.com/in/profdryusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        className="w-full bg-[#5A70B9] text-white py-3 md:py-4 px-4 md:px-6 rounded-[17px] font-bold text-left flex items-center 
                                   transition-all duration-300 hover:bg-blue-700 group text-sm md:text-base"
                        >
                        <FontAwesomeIcon icon={['fab', 'linkedin']} className="mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform" /> 
                          LinkedIn Profilimiz
                        </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-white rounded-[31px] p-6 md:p-10 shadow-xl">
                    <div className="text-center mb-4 md:mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#394C8C] mb-2 md:mb-4">
                        Hemen Randevu Oluşturun
                      </h2>
                      <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
                        Sağlık danışmanlığı ve muayene için hızlı ve kolay bir şekilde randevu alabilirsiniz.
                      </p>
                    </div>
                    
                    <div className="flex items-center bg-[#EFF5FB] p-3 md:p-4 rounded-xl w-full">
                      <div className="mr-3 md:mr-4">
                        <FontAwesomeIcon 
                          icon={faCalendarAlt} 
                          className="text-2xl md:text-3xl text-[#394C8C]" 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E2E62] text-sm md:text-base">Hızlı Randevu</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Online olarak dakikalar içinde randevu alın
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => navigate('/login')}
                      className="mt-6 md:mt-8 bg-[#394C8C] text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-base md:text-xl 
                                 transition-all duration-300 hover:bg-[#5A70B9] hover:shadow-xl"
                    >
                      Randevu Oluştur
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        } />
        <Route path="/about" element={<AboutDetail />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videolar" element={<Videos />} />
        <Route path="/blog" element={<AllBlogPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointment" element={<AppointmentFormPage />} />
        <Route path="/hakkimda-detay" element={<AboutDetail />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
}

export default App;