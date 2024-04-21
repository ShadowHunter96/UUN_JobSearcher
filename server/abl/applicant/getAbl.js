const applicantDao = require("../../dao/applicant-dao.js");

async function GetAbl(req, res) {
  try {

    const applicantId = parseInt(req.params.id, 10);
    if (isNaN(applicantId)) {
      return res.status(400).json({
        message: "Invalid applicant ID format",
      });
    }


    const applicant = applicantDao.get(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: `Applicant with ID ${applicantId} not found` });
    }

    res.json(applicant);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
