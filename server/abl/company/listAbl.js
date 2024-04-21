const companyDao = require("../../dao/company-dao.js");

async function listAbl(req, res) {
  try {
   const companyList = companyDao.list();
    res.json(companyList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = listAbl;
