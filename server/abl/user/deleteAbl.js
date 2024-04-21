const userDao = require("../../dao/user-dao.js");

async function DeleteAbl(req, res) {
  try {

    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user ID format",
      });
    }


    const userExists = userDao.get(userId);
    if (!userExists) {

      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }


    userDao.remove(userId);


    res.status(200).json({ message: `User with ID ${userId} deleted` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;

