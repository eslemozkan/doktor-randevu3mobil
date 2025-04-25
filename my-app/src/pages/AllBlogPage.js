import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BlogModal from '../components/BlogModal';

const AllBlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const staticBlogPosts = [
    {
      id: 1,
      title: "Diyabet ve Beslenme Stratejileri",
      excerpt: "Sağlıklı yaşam için doğru beslenme alışkanlıkları ve diyabet yönetimi",
      image_url: "https://via.placeholder.com/400x250?text=Blog+1",
      content: "Diyabet hastaları için beslenme önerileri ve dikkat edilmesi gerekenler hakkında detaylı bilgiler..."
    },
    {
      id: 2,
      title: "Tiroid Hastalıklarında Beslenme",
      excerpt: "Tiroid sağlığını destekleyen doğal yöntemler",
      image_url: "https://via.placeholder.com/400x250?text=Blog+2",
      content: "Tiroid hastalıklarının belirtileri, teşhisi ve tedavi yöntemleri hakkında detaylı bilgiler..."
    },
    {
      id: 3,
      title: "Metabolik Sağlık ve Egzersiz",
      excerpt: "Metabolik hastalıklardan korunma ve tedavi yöntemleri",
      image_url: "https://via.placeholder.com/400x250?text=Blog+3",
      content: "Metabolik sağlık için egzersiz önerileri ve yaşam tarzı değişiklikleri hakkında detaylı bilgiler..."
    }
  ];

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

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
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E2E62]">Tüm Blog Yazıları</h1>
              <div className="h-[2px] w-12 bg-[#394C8C]"></div>
            </div>
            <p className="text-gray-600 text-sm md:text-base">Sağlık ve beslenme hakkında güncel bilgiler</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {staticBlogPosts.map((post) => (
              <div 
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 relative overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-40 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 md:w-3/4">
                    <h2 className="text-base md:text-lg font-bold text-[#1E2E62] mb-2 group-hover:text-[#394C8C] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <button 
                      onClick={() => handleBlogClick(post)}
                      className="inline-flex items-center text-[#394C8C] hover:text-[#5A70B9] transition-colors group"
                    >
                      <span className="mr-2 text-sm font-medium">Devamını Oku</span>
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

        {selectedBlog && (
          <BlogModal 
            blog={selectedBlog}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default AllBlogPage;
