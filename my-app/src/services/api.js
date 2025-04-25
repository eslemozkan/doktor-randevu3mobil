const API_URL = 'http://localhost:3001/api';

export const api = {
  // Blog endpoints
  async getBlogs() {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) throw new Error('Blogs fetch failed');
    return response.json();
  },

  async createBlog(blogData) {
    const response = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) throw new Error('Blog creation failed');
    return response.json();
  },

  async updateBlog(id, blogData) {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) throw new Error('Blog update failed');
    return response.json();
  },

  async deleteBlog(id) {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Blog deletion failed');
    return response.json();
  },

  // Appointment endpoints
  async getAppointments() {
    const response = await fetch(`${API_URL}/appointments`);
    if (!response.ok) throw new Error('Appointments fetch failed');
    return response.json();
  },

  async createAppointment(appointmentData) {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) throw new Error('Appointment creation failed');
    return response.json();
  },

  // Video endpoints
  async getVideos() {
    const response = await fetch(`${API_URL}/videos`);
    if (!response.ok) throw new Error('Videos fetch failed');
    return response.json();
  },

  async createVideo(videoData) {
    const response = await fetch(`${API_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    });
    if (!response.ok) throw new Error('Video creation failed');
    return response.json();
  },

  async updateVideo(id, videoData) {
    const response = await fetch(`${API_URL}/videos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    });
    if (!response.ok) throw new Error('Video update failed');
    return response.json();
  },

  async deleteVideo(id) {
    const response = await fetch(`${API_URL}/videos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Video deletion failed');
    return response.json();
  }
}; 