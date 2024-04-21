const applicantDao = require("../../dao/applicant-dao.js");

async function DeleteApplicantAbl(req, res) {
  try {

    const applicantId = parseInt(req.params.id, 10);
    if (isNaN(applicantId)) {
      return res.status(400).json({
        message: "Invalid applicant ID format",
      });
    }

    const applicantExists = applicantDao.get(applicantId);
    if (!applicantExists) {

      return res.status(404).json({ message: `Applicant with ID ${applicantId} not found` });
    }


    const isDeleted = applicantDao.remove(applicantId);
    if (!isDeleted) {

      return res.status(500).json({ message: `Failed to delete applicant with ID ${applicantId}` });
    }

    res.status(200).json({ message: `Applicant with ID ${applicantId} deleted` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteApplicantAbl;
