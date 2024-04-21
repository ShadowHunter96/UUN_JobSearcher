const applicantDao = require("../../dao/applicant-dao.js");

async function ListAbl(req, res) {
  try {

    const applicantList = applicantDao.list();

    res.json(applicantList);
  } catch (e) {

    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
