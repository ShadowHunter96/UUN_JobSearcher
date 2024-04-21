const Ajv = require("ajv");
const ajv = new Ajv();
const answerDao = require("../../dao/answer-dao.js");
const applicantDao = require("../../dao/applicant-dao.js");
const techJobDao = require("../../dao/techjob-dao.js");

const answerSchema = {
  type: "object",
  properties: {
    techJobId: { type: "number" },
    applicantId: { type: "number" }
  },
  required: ["techJobId", "applicantId"],
  additionalProperties: false
};

async function createAbl(req, res) {
  try {
    let answer = req.body;

    const valid = ajv.validate(answerSchema, answer);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const applicantExists = await applicantDao.exists(answer.applicantId);
    if (!applicantExists) {
      return res.status(404).json({
        code: "applicantNotFound",
        message: `Applicant with ID ${answer.applicantId} not found.`,
      });
    }


    const techJobExists = await techJobDao.exists(answer.techJobId);
    if (!techJobExists) {
      return res.status(404).json({
        code: "techJobNotFound",
        message: `Tech job with ID ${answer.techJobId} not found.`,
      });
    }

    answer = answerDao.create(answer);
    res.json(answer);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = createAbl;
