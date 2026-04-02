const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// @route GET /api/blogs
// @desc Get all published blogs
// @access Public
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/blogs/:slug
// @desc Get single blog by slug
// @access Public
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true }).populate("author", "name");
    
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
