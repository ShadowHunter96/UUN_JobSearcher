const companyDao = require("../../dao/company-dao.js");

async function getAbl(req, res) {
  try {
 
    const companyId = parseInt(req.params.id, 10);
    if (isNaN(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID format",
      });
    }

   
    const company = companyDao.get(companyId);
    if (!company) {
    
      return res.status(404).json({ message: `Company with ID ${companyId} not found` });
    }

    
    res.json(company);
  } catch (e) {
    
    res.status(500).json({ message: e.message });
  }
}

module.exports = getAbl;
