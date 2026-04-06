const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route POST /api/products
// @desc create a new Product
// @access Private/Admin
router.post("/", protect, admin, upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      subCategory,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      isFeatured,
      isPublished,
      isBestSeller,
      isPremium,
      isSugarFree,
      festivalTags,
      productType,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    let images = [];

    // If there are files, upload them to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve({ url: result.secure_url });
            else reject(error);
          });
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      });
      images = await Promise.all(uploadPromises);
    }

    const product = new Product({
      name,
      description,
      basePrice: price,
      discountPrice,
      countInStock,
      category,
      subCategory,
      brand,
      sizes: Array.isArray(sizes) ? sizes : sizes?.split(","),
      colors: Array.isArray(colors) ? colors : colors?.split(","),
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      isBestSeller,
      isPremium,
      isSugarFree,
      festivalTags: Array.isArray(festivalTags) ? festivalTags : festivalTags?.split(","),
      productType,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @Route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      subCategory,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images, // Existing images passed back as JSON
      isFeatured,
      isPublished,
      isBestSeller,
      isPremium,
      isSugarFree,
      festivalTags,
      productType,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      let updatedImages = [];

      // Parse existing images if they come as a string (happens with FormData)
      const existingImages = req.body.existingImages;
      if (typeof existingImages === "string") {
        updatedImages = JSON.parse(existingImages);
      } else if (Array.isArray(existingImages)) {
        updatedImages = existingImages;
      }

      // If there are new files, upload them and add to updatedImages
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map((file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => {
              if (result) resolve({ url: result.secure_url });
              else reject(error);
            });
            streamifier.createReadStream(file.buffer).pipe(stream);
          });
        });
        const newImages = await Promise.all(uploadPromises);
        updatedImages = [...updatedImages, ...newImages];
      }

      //Update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.basePrice = price || product.basePrice;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.brand = brand || product.brand;
      product.sizes = Array.isArray(sizes) ? sizes : sizes?.split(",") || product.sizes;
      product.colors = Array.isArray(colors) ? colors : colors?.split(",") || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = updatedImages;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
      product.isBestSeller = isBestSeller !== undefined ? isBestSeller : product.isBestSeller;
      product.isPremium = isPremium !== undefined ? isPremium : product.isPremium;
      product.isSugarFree = isSugarFree !== undefined ? isSugarFree : product.isSugarFree;
      product.festivalTags = Array.isArray(festivalTags) ? festivalTags : festivalTags?.split(",") || product.festivalTags;
      product.productType = productType || product.productType;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Save the updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @Route DELETE /api/product/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    //Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      //Remove from database
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    //Filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection.toLowerCase();
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = Number(minPrice);
      if (maxPrice) query.basePrice.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { basePrice: 1 };
          break;
        case "priceDesc":
          sort = { basePrice: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    //Fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("server Error");
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/new-arrivals
// @desc Retrieve 8 latest products - Creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    //Fetch 8 latest products
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/categories
// @desc Retrieve all unique product categories
// @access Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, //Exclude the current product ID
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/product/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
