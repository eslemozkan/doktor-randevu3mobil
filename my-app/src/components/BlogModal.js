import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="text-2xl" />
        </button>

        <div className="p-6 md:p-8">
          <div className="relative w-full h-64 md:h-80 mb-6 rounded-xl overflow-hidden">
            <img 
              src={blog.image_url} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2E62] mb-4">
            {blog.title}
          </h2>

          <div className="prose max-w-none text-gray-600">
            <p className="text-base md:text-lg leading-relaxed mb-4">
              {blog.excerpt}
            </p>
            <div className="text-base md:text-lg leading-relaxed">
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal; 