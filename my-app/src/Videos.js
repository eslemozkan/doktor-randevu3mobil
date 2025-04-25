import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Videos = () => {
  const staticVideos = [
    {
      id: 1,
      title: "Diyabet ve Beslenme",
      description: "Diyabet hastaları için beslenme önerileri ve dikkat edilmesi gerekenler hakkında bilgilendirici video.",
      thumbnail: "https://img.youtube.com/vi/xjwQju1p2_w/maxresdefault.jpg",
      youtubeLink: "https://www.youtube.com/watch?v=xjwQju1p2_w"
    },
    {
      id: 2,
      title: "Tiroid Hastalıkları",
      description: "Tiroid hastalıklarının belirtileri, teşhisi ve tedavi yöntemleri hakkında detaylı bilgi.",
      thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
      youtubeLink: "https://www.youtube.com/watch?v=example2"
    },
    {
      id: 3,
      title: "Sağlıklı Yaşam İçin Öneriler",
      description: "Günlük hayatta sağlıklı yaşam için uygulanabilecek pratik öneriler ve ipuçları.",
      thumbnail: "https://img.youtube.com/vi/example3/maxresdefault.jpg",
      youtubeLink: "https://www.youtube.com/watch?v=example3"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF5FB] to-white">
      <div className="container mx-auto px-8 py-12">
        <div className="relative flex flex-col items-center mb-16">
          <Link 
            to="/" 
            className="absolute left-0 top-0 flex items-center text-[#394C8C] hover:text-[#5A70B9] transition-colors group"
          >
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="mr-2 transform group-hover:-translate-x-1 transition-transform" 
            />
            <span>Geri Dön</span>
          </Link>
          <div className="text-center mt-16">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[2px] w-12 bg-[#394C8C]"></div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E2E62]">Videolar</h1>
              <div className="h-[2px] w-12 bg-[#394C8C]"></div>
            </div>
            <p className="text-gray-600 text-sm md:text-base">Sağlık ve beslenme hakkında eğitici videolar</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {staticVideos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 relative overflow-hidden">
                    <div className="relative pb-[56.25%]">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <button
                        onClick={() => window.open(video.youtubeLink, '_blank')}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      >
                        <FontAwesomeIcon 
                          icon={faPlay} 
                          className="text-white text-4xl transform group-hover:scale-110 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="p-5 md:w-2/3">
                    <h2 className="text-base md:text-lg font-bold text-[#1E2E62] mb-2 group-hover:text-[#394C8C] transition-colors">
                      {video.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <button 
                      onClick={() => window.open(video.youtubeLink, '_blank')}
                      className="inline-flex items-center text-[#394C8C] hover:text-[#5A70B9] transition-colors group"
                    >
                      <span className="mr-2 text-sm font-medium">İzle</span>
                      <FontAwesomeIcon 
                        icon={faArrowRight} 
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
