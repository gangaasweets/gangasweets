const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load backend .env
dotenv.config({ path: path.join(__dirname, "../.env") });

const Product = require("../models/Product");

const migrateCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for migration...");

        const products = await Product.find({});
        console.log(`Found ${products.length} products to check.`);

        let updatedCount = 0;
        for (const product of products) {
            if (product.category) {
                const original = product.category;
                const normalized = original.trim().toLowerCase();
                
                if (original !== normalized) {
                    product.category = normalized;
                    try {
                        await product.save();
                        updatedCount++;
                    } catch (err) {
                        console.error(`Failed to update product ${product._id}: ${err.message}`);
                    }
                }
            }
        }

        console.log(`Successfully updated ${updatedCount} products.`);
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrateCategories();
