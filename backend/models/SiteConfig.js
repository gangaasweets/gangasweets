const mongoose = require("mongoose");

const siteConfigSchema = new mongoose.Schema(
  {
    heroImage: {
      url: { type: String },
      altText: { type: String, default: "Hero Image" },
    },
    festivalMode: {
      isActive: { type: Boolean, default: false },
      name: { type: String },
      bannerImage: { type: String },
      themeColor: { type: String },
    },
    aboutUsHeroImage: {
      url: { type: String },
      altText: { type: String, default: "About Us Hero" },
    },
    aboutUsStoryImage: {
      url: { type: String },
      altText: { type: String, default: "Our Story" },
    },
    aboutUsBrandImage: {
      url: { type: String },
      altText: { type: String, default: "Brand Story" },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SiteConfig", siteConfigSchema);
