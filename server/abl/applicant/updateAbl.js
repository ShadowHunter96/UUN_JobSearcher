const Ajv = require("ajv");
const ajv = new Ajv();
const applicantDao = require("../../dao/applicant-dao.js");
const addFormats = require("ajv-formats");
addFormats(ajv)

// Schéma pro validaci uchazeče, které obsahuje všechna pole, která můžete chtít aktualizovat
const applicantSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    surname: { type: "string" },
    email: { type: "string", format: "email" },
    phoneNumber: { type: "string" },
    selfDescription: { type: "string" },
    linkedInUrl: { type: "string" },
    seniority: { type: "string" }
  },
  required: ["id"], // Pouze ID je povinné pro identifikaci uchazeče
  additionalProperties: false
};

async function updateAbl(req, res) {
  try {
    const applicantId = parseInt(req.params.id, 10);
    if (isNaN(applicantId)) {
      return res.status(400).json({
        message: "Invalid applicant ID format",
      });
    }

    let applicantData = req.body;
    applicantData.id = applicantId;


    const valid = ajv.validate(applicantSchema, applicantData);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const applicants = applicantDao.list();
    const emailTaken = applicants.some(applicant => 
      applicant.email === applicantData.email && applicant.id !== applicantId
    );
    
    if (emailTaken) {
      return res.status(400).json({
        code: "emailAlreadyExists",
        message: "Email is already in use by another applicant."
      });
    }

    const existingApplicant = applicantDao.get(applicantId);
    if (!existingApplicant) {
      return res.status(404).json({ message: `Applicant with ID ${applicantId} not found` });
    }

    const updatedApplicant = applicantDao.update(applicantData);
    if (!updatedApplicant) {
      return res.status(500).json({ message: `Failed to update applicant with ID ${applicantId}` });
    }

    res.json(updatedApplicant);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = updateAbl;
