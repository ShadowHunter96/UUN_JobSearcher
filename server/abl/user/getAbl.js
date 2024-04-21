const Ajv = require("ajv");
const ajv = new Ajv();
const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
  
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        code: "invalidId",
        message: "The 'id' must be a number.",
      });
    }


    const user = userDao.get(userId);
    if (!user) {
      return res.status(404).json({
        code: "userNotFound",
        message: `User with ID ${userId} not found.`,
      });
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
