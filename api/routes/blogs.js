const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new blog
router.post("/", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
