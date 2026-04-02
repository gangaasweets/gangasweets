const express = require("express");
const Blog = require("../models/Blog");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// @route GET /api/admin/blogs
// @desc Get all blogs (for admin)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate("author", "name");
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/blogs
// @desc Create a new blog
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { title, content, excerpt, image, isPublished, metaTitle, metaDescription } = req.body;

    const slug = generateSlug(title);

    // Check if slug exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ message: "A blog with a similar title already exists." });
    }

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      image,
      author: req.user._id,
      isPublished: isPublished !== undefined ? isPublished : true,
      metaTitle,
      metaDescription,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/admin/blogs/:id
// @desc Update a blog
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { title, content, excerpt, image, isPublished, metaTitle, metaDescription } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
      if (title && title !== blog.title) {
        blog.title = title;
        blog.slug = generateSlug(title);
      }
      
      blog.content = content || blog.content;
      blog.excerpt = excerpt || blog.excerpt;
      blog.image = image || blog.image;
      blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
      blog.metaTitle = metaTitle || blog.metaTitle;
      blog.metaDescription = metaDescription || blog.metaDescription;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/blogs/:id
// @desc Delete a blog
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: "Blog removed" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
