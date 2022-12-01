
const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const developerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    position: {
      type: String,
      required: [true],
    },
    avatarUrl: {
      type: String,
      required: [true],
    },
  },
  { versionKey: false }
);

developerSchema.post("save", handleSaveErrors);

const Developer = model("developer", developerSchema);

module.exports = { Developer };
