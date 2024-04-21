const Ajv = require("ajv");
const ajv = new Ajv();
const companyDao = require("../../dao/company-dao.js");


const companySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    companyDescription: { type: "string" }
  },
  required: ["name", "companyDescription"],
  additionalProperties: false
};

async function createAbl(req, res) {
  try {
    let company = req.body;

    const valid = ajv.validate(companySchema, company);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const companyList = companyDao.list();
    const nameExists = companyList.some((c) => c.name === company.name);
    if (nameExists) {
      return res.status(400).json({
        code: "companyNameAlreadyExists",
        message: `Company with name ${company.name} already exists`,
      });
    }

    company = companyDao.create(company);
    res.json(company);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = createAbl;
