const techJobDao = require("../../dao/techjob-dao.js");

async function ListAbl(req, res) {
  try {
    const techJobList = techJobDao.list();
    res.json(techJobList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
