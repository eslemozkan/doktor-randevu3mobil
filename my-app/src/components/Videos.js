import React, { useState, useEffect } from "react";
import { supabase } from '../config/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
            <div
              className="flex shrink-0 bg-zinc-300 h-[143px] w-[247px] rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="Video thumbnail"
            />
            <div
              className="flex shrink-0 bg-zinc-300 h-[143px] w-[246px] rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="Video thumbnail"
            />
            <div
              className="flex shrink-0 bg-zinc-300 h-[143px] w-[247px] rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="Video thumbnail"
            />
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
    </section>
  );
}

export default Videos; 