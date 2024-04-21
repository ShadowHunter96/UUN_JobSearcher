const companyDao = require("../../dao/company-dao.js");

async function deleteAbl(req, res) {
  try {

    const companyId = parseInt(req.params.id, 10);
    if (isNaN(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID format",
      });
    }

    const companyExists = companyDao.get(companyId);
    if (!companyExists) {

      return res.status(404).json({ message: `Company with ID ${companyId} not found` });
    }

    const isDeleted = companyDao.remove(companyId);
    if (!isDeleted) {

      return res.status(500).json({ message: `Failed to delete company with ID ${companyId}` });
    }

    res.status(200).json({ message: `Company with ID ${companyId} deleted` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = deleteAbl;
