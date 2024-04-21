const Ajv = require("ajv");
const ajv = new Ajv();
const answerDao = require("../../dao/answer-dao.js");
const applicantDao = require("../../dao/applicant-dao.js");
const techJobDao = require("../../dao/techjob-dao.js");


async function getAbl(req, res) {
  try {

    const techJobId = parseInt(req.params.id, 10);
    if (isNaN(techJobId)) {
      return res.status(400).json({
        code: "invalidId",
        message: "The 'id' must be a number.",
      });
    }

    const techJobExists = await techJobDao.exists(techJobId);
    if (!techJobExists) {
      return res.status(404).json({
        code: "techJobNotFound",
        message: `Tech job with ID ${techJobId} not found.`,
      });
    }


    const answers = await answerDao.listByTechJobId(techJobId);
    if (!answers || answers.length === 0) {
      return res.status(404).json({
        code: "noApplicantsFound",
        message: `No applicants found for Tech Job ID ${techJobId}.`,
      });
    }

    const applicants = await Promise.all(
      answers.map(async (answer) => {
        const applicant = await applicantDao.get(answer.applicantId);
        return applicant ? { ...answer, applicantDetails: applicant } : null;
      })
    );


    const applicantsWithDetails = applicants.filter((a) => a !== null);

    res.json(applicantsWithDetails);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = getAbl;
