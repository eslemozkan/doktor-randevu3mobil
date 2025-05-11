import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Browser } from '@capacitor/browser';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

const AllVideosPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openYouTubeVideo = async (url) => {
    await Browser.open({ url });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB] flex items-center justify-center">
        <div className="text-[#1E2E62]">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB] flex items-center justify-center">
        <div className="text-red-500">Hata: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB] pt-8 pb-12">
      <div className="container mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#394C8C] hover:text-[#5A70B9] mb-6 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Geri
        </button>
        
        <h1 className="text-2xl font-bold text-[#1E2E62] mb-10 text-center">Tüm Videolar</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div 
                className="relative cursor-pointer" 
                onClick={() => openYouTubeVideo(video.url)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <FontAwesomeIcon 
                    icon={faPlay} 
                    className="text-white text-lg"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-[#1E2E62] mb-2">{video.title}</h3>
                <p className="text-xs text-gray-600 mb-4">{video.description}</p>
                <button
                  onClick={() => openYouTubeVideo(video.url)}
                  className="w-full bg-[#394C8C] text-white text-xs py-2.5 rounded-lg hover:bg-[#5A70B9] transition-colors"
                >
                  İzle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllVideosPage; 