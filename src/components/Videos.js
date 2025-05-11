import React, { useState, useEffect } from "react";
import { supabase } from '../config/supabase';

function Videos() {
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
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setVideos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center px-20 pt-11 pb-20 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
        <div className="text-[#1E2E62]">Yükleniyor...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center px-20 pt-11 pb-20 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
        <div className="text-red-500">Hata: {error}</div>
      </section>
    );
  }

  return (
    <section
      id="videos"
      className="flex flex-col items-center px-20 pt-11 pb-20 w-full bg-slate-100 max-md:px-5 max-md:max-w-full"
    >
      <div className="flex flex-col items-center w-full max-w-[1105px] max-md:max-w-full">
        <h2 className="text-4xl font-semibold text-blue-950">Videolar</h2>
        <div className="flex gap-5 justify-between self-stretch mt-11 max-md:mt-10 max-md:max-w-full relative">
          <button 
            aria-label="Previous video"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/200ee5b628dfce991b617be94c14ec953b452a33?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
              className="object-contain overflow-hidden shrink-0 aspect-square rounded-[40px] w-[68px] max-md:w-[50px]"
              alt="Previous"
            />
          </button>
          <div className="flex gap-4 w-full justify-center">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex shrink-0 bg-zinc-300 h-[143px] w-[247px] rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="Video thumbnail"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtube_id}`, '_blank')}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button 
            aria-label="Next video"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/75b4bd9475efb8c2384652606532215e0a1d72a9?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
              className="object-contain overflow-hidden shrink-0 aspect-square rounded-[40px] w-[68px] max-md:w-[50px]"
              alt="Next"
            />
          </button>
        </div>
        <button 
          className="px-7 py-4 mt-16 max-w-full text-base font-bold text-white bg-blue-900 rounded-[40px] w-[149px] max-md:px-5 max-md:mt-10 hover:bg-blue-800 transition-colors"
          onClick={() => window.location.href = '/videos'}
        >
          Tümünü Gör
        </button>
      </div>
    </section>
  );
}

export default Videos; 