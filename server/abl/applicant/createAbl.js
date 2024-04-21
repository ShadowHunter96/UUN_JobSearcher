const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const applicantDao = require("../../dao/applicant-dao.js");

const applicantSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    surname: { type: "string" },
    email: { type: "string", format: "email" },
    phoneNumber: { type: "string" },
    selfDescription: { type: "string" },
    linkedInUrl: { type: "string" },
    seniority: { type: "string" }
  },
  required: ["name", "surname", "email", "phoneNumber", "selfDescription", "seniority"],
  additionalProperties: false
};

async function CreateAbl(req, res) {
  try {
    let applicant = req.body;

    const valid = ajv.validate(applicantSchema, applicant);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const applicantList = applicantDao.list();
    const emailExists = applicantList.some((a) => a.email === applicant.email);
    if (emailExists) {
      return res.status(400).json({
        code: "emailAlreadyExists",
        message: `Applicant with email ${applicant.email} already exists`,
      });
    }

    applicant = applicantDao.create(applicant);
    res.json(applicant);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;

