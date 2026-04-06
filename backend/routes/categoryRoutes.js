const express = require("express");
const Category = require("../models/Category");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/categories
// @desc Get all categories
// @access Public
router.get("/", async (req, res) => {
  try {
    // Get categories from both the Category collection and the distinct categories in the Product collection
    const definedCategories = await Category.find({}).sort({ name: 1 });
    const productCategories = await Product.distinct("category");
    
    // Convert to a uniform format (array of objects with _id and name)
    const categoryMap = new Map();
    
    // First, add all defined categories
    definedCategories.forEach(cat => {
      categoryMap.set(cat.name.toLowerCase(), {
        _id: cat._id,
        name: cat.name,
        description: cat.description
      });
    });
    
    // Then, add any categories found in products that aren't already defined
    productCategories.forEach(catName => {
      if (catName && !categoryMap.has(catName.toLowerCase())) {
        categoryMap.set(catName.toLowerCase(), {
          _id: catName, // Use name as ID for ad-hoc categories
          name: catName,
          description: "Auto-discovered from products"
        });
      }
    });
    
    res.json(Array.from(categoryMap.values()));
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/categories
// @desc Create a new category
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const categoryExists = await Category.findOne({ name: name.trim() });

    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: name.trim(),
      description,
      image
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/categories/:id
// @desc Delete a category
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await category.deleteOne();
      res.json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
