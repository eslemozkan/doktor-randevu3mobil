import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUserMd } from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <section 
      id="about" 
      className="relative bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB] py-16 md:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl space-y-6 md:space-y-8">
            <div className="flex items-center space-x-4">
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
              <h2 className="text-xl md:text-3xl font-bold text-[#1E2E62] flex items-center space-x-3">
                <FontAwesomeIcon icon={faUserMd} className="text-[#394C8C] mr-3" />
                Hakkımda
              </h2>
            </div>
            
            <div className="relative w-full max-w-[200px] mx-auto">
              <div className="absolute -left-3 -top-3 w-24 h-24 md:w-32 md:h-32 bg-[#394C8C] opacity-10 rounded-full"></div>
              <div className="relative z-10">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5bedf5daa1fa33924ca0fa3b917efebf9d03dec?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
                  alt="Prof. Dr. Yusuf Özkan"
                  className="w-full rounded-xl shadow-lg object-cover aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-[#394C8C] opacity-20 rounded-xl hover:opacity-0 transition-opacity duration-500"></div>
              </div>
            </div>
            
            <p className="text-base md:text-xl text-gray-700 leading-relaxed">
              Endokrinoloji ve Metabolizma Hastalıkları alanında uzman bir hekim olarak, 
              hastalarımın sağlığına ve yaşam kalitesine odaklanıyorum. Diyabet, tiroid 
              hastalıkları, hormon bozuklukları gibi karmaşık sağlık sorunlarında 
              profesyonel ve kapsamlı tedavi yaklaşımları sunuyorum.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#394C8C] text-white rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <span className="text-base md:text-lg font-semibold text-[#1E2E62]">
                  +20 Yıllık Deneyim Uzmanı
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#394C8C] text-white rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <span className="text-base md:text-lg font-semibold text-[#1E2E62]">
                  Ulusal ve Uluslararası Kongre Katılımları
                </span>
              </div>
            </div>
            
            <Link 
              to="/hakkimda-detay"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#394C8C] text-white rounded-full 
                         hover:bg-[#5A70B9] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">Detaylı Özgeçmiş</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Arka plan gradient dekorasyonu */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#394C8C] to-transparent opacity-5"></div>
    </section>
  );
}

export default About;