import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/videos');
        if (!response.ok) {
          throw new Error('Videolar yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#EFF5FB] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#394C8C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Videolar yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#EFF5FB] to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-[#394C8C] hover:text-[#5A70B9] transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF5FB] to-white">
      <div className="container mx-auto px-8 py-12">
        <div className="relative flex flex-col items-center mb-16">
          <Link 
            to="/" 
            className="absolute left-0 top-0 flex items-center text-[#394C8C] hover:text-[#5A70B9] transition-colors group"
          >
            <FontAwesomeIcon 
              icon={faArrowLeft} 
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

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {videos.map((video) => (
              <div 
                key={video.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 relative overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-40 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
                  <div className="p-5 md:w-3/4">
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
