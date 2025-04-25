import { supabase } from '../config/supabase';

export const blogService = {
  async getBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createBlog(blogData) {
    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData]);
    
    if (error) throw error;
    return data;
  },

  async updateBlog(id, blogData) {
    const { data, error } = await supabase
      .from('blogs')
      .update(blogData)
      .eq('id', id);
    
    if (error) throw error;
    return data;
  },

  async deleteBlog(id) {
    const { data, error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return data;
  }
}; 