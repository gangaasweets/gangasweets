require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const siteSettingsRoutes = require("./routes/siteSettingsRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminBlogRoutes = require("./routes/adminBlogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
app.use(express.json());
app.use(cors(
  // {
  //   origin: ["https://rabbit-clothings.vercel.app", "http://localhost:5173"],
  //   credentials: true,
  // }
));


const PORT = process.env.PORT || 9000;
// Connect to MongoDB
connectDB();



//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/", subscribeRoutes);

//Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/site-settings", siteSettingsRoutes);
app.use("/api/admin/blogs", adminBlogRoutes);
app.use("/api/blogs", blogRoutes); // Using /api/blogs for public access as well


// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend/dist directory
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // For any other request, serve the index.html from the dist folder (SPA support)
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to Ganga Sweets API (Development Mode)!");
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
