import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

function AllBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogError, setBlogError] = useState(null);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1E2E62] mb-8 text-center">Tüm Blog Yazıları</h1>
      {loadingBlogs ? (
        <div className="text-center text-[#1E2E62]">Yükleniyor...</div>
      ) : blogError ? (
        <div className="text-center text-red-500">Hata: {blogError}</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500">Henüz blog yazısı eklenmemiş.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#1E2E62] mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBlogPage; 