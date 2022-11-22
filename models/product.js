const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const productSchema = new Schema(
  {
    categories: {
      type: Array,
      required: [true],
    },
    weight: {
      type: Number,
      required: [true],
    },
    title: {
      type: Object,
      required: [true],
    },
    calories: {
      type: Number,
      required: [true],
    },
    groupBloodNotAllowed: {
      type: Array,
      required: [true],
    },
  },
  { versionKey: false }
);

productSchema.post("save", handleSaveErrors);

const Product = model("product", productSchema);

module.exports = { Product };
