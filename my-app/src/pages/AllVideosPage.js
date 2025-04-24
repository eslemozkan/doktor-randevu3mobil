import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Browser } from '@capacitor/browser';

const AllVideosPage = () => {
  const openYouTubeVideo = async (youtubeId) => {
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    await Browser.open({ url });
  };

  // Şimdilik statik veri, ileride veritabanından gelecek
  const videos = [
    { 
      id: 1, 
      title: 'Miladın Mutfağı', 
      description: 'Televizyon Programı', 
      youtubeId: 'xjwQju1p2_w',
      thumbnail: 'https://img.youtube.com/vi/xjwQju1p2_w/maxresdefault.jpg'
    },
    { 
      id: 2, 
      title: 'Fırat\'ta Gündem Opr Dr Ali Şekerlisoy Prof Dr Yusuf Özkan 07 01 2021', 
      description: 'Televizyon Programı', 
      youtubeId: 'GDD7Daj4Ujw',
      thumbnail: 'https://img.youtube.com/vi/GDD7Daj4Ujw/maxresdefault.jpg'
    },
    { 
      id: 3, 
      title: 'Miladın Mutfağı', 
      description: 'Televizyon Programı', 
      youtubeId: '0_nCWRqtoVw',
      thumbnail: 'https://img.youtube.com/vi/0_nCWRqtoVw/maxresdefault.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-8 py-16">
        <div className="bg-[#F5F7FA] rounded-3xl p-16 shadow-lg">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
              <h1 className="text-5xl font-bold text-[#1E2E62]">Tüm Videolar</h1>
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sağlık, yaşam kalitesi ve tıbbi konularda profesyonel bakış açısıyla hazırlanmış 
              bilgilendirici ve güncel video içeriklerimiz
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg 
                           transform transition-all duration-300 hover:-translate-y-2 
                           hover:shadow-xl group"
              >
                <div className="relative w-full aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transform transition-transform duration-300 
                               group-hover:scale-110 cursor-pointer"
                    onClick={() => openYouTubeVideo(video.youtubeId)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon 
                      icon={faPlayCircle} 
                      className="text-white text-4xl md:text-5xl transform transition-transform duration-300 
                                 group-hover:scale-110 cursor-pointer"
                      onClick={() => openYouTubeVideo(video.youtubeId)}
                    />
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-[#1E2E62] mb-2 md:mb-3 
                                 group-hover:text-[#394C8C] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                    {video.description}
                  </p>
                  <button 
                    className="group flex items-center space-x-2 text-[#394C8C] 
                               font-semibold hover:text-[#5A70B9] transition-colors text-sm md:text-base"
                    onClick={() => openYouTubeVideo(video.youtubeId)}
                  >
                    <span>İzle</span>
                    <FontAwesomeIcon 
                      icon={faArrowRight} 
                      className="transform group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllVideosPage;
