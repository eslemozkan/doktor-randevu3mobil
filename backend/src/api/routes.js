import express from 'express';
import { blogService } from '../services/blogService';
import { videoService } from '../services/videoService';

const router = express.Router();

// Blog routes
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await blogService.getBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Video routes
router.get('/videos', async (req, res) => {
  try {
    const videos = await videoService.getVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/videos', async (req, res) => {
  try {
    const video = await videoService.createVideo(req.body);
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/videos/:id', async (req, res) => {
  try {
    const video = await videoService.updateVideo(req.params.id, req.body);
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/videos/:id', async (req, res) => {
  try {
    const video = await videoService.deleteVideo(req.params.id);
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 