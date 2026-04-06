const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
        type: String, // Optional image for category
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to normalize name to lowercase for consistent matching
categorySchema.pre("save", function (next) {
  this.name = this.name.trim();
  next();
});

module.exports = mongoose.model("Category", categorySchema);
