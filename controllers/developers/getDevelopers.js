const { Developer } = require("../../models");
const { RequestError } = require("../../helpers");

const getDevelopers = async (_, res) => {
  const result = await Developer.find({});
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getDevelopers;
