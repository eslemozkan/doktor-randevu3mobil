import { supabase } from '../config/supabase';

export const videoService = {
  async getVideos() {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createVideo(videoData) {
    const { data, error } = await supabase
      .from('videos')
      .insert([videoData]);
    
    if (error) throw error;
    return data;
  },

  async updateVideo(id, videoData) {
    const { data, error } = await supabase
      .from('videos')
      .update(videoData)
      .eq('id', id);
    
    if (error) throw error;
    return data;
  },

  async deleteVideo(id) {
    const { data, error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return data;
  }
}; 