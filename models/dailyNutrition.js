const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const dailyNutritionSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true],
    },
    product: {
      type: String,
      required: [true],
    },
    grams: {
      type: Number,
      required: [true],
    },
    calories: {
      type: Number,
      required: [true],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

dailyNutritionSchema.post("save", handleSaveErrors);

const DailyNutrition = model("dailyNutrition", dailyNutritionSchema);

module.exports = { DailyNutrition };
