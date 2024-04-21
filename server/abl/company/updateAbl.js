const Ajv = require("ajv");
const ajv = new Ajv();
const companyDao = require("../../dao/company-dao.js");

// Definice schématu pro validaci dat společnosti
const companySchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    companyDescription: { type: "string" }
  },
  required: ["id", "name", "companyDescription"], // ID je povinné pro identifikaci, jméno a popis společnosti pro aktualizaci
  additionalProperties: false
};

async function updateAbl(req, res) {
  try {
    const companyId = parseInt(req.params.id, 10);
    if (isNaN(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID format",
      });
    }

    let companyData = req.body;
    companyData.id = companyId;


    const valid = ajv.validate(companySchema, companyData);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }


    const existingCompany = companyDao.get(companyId);
    if (!existingCompany) {
      return res.status(404).json({ message: `Company with ID ${companyId} not found` });
    }

    const updatedCompany = companyDao.update(companyData);
    if (!updatedCompany) {
      return res.status(500).json({ message: `Failed to update company with ID ${companyId}` });
    }

    res.json(updatedCompany);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = updateAbl;
