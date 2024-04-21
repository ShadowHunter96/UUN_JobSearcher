const Ajv = require("ajv");
const ajv = new Ajv();
const techJobDao = require("../../dao/techjob-dao.js");


const techJobSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    baitText: { type: "string" },
    description: { type: "string" },
    seniority: { type: "string" },
    education: { type: "string" },
    city: { type: "string" },
    budget: { type: "number" },
    currency: { type: "string" },
    approved: { type: "boolean", default: false },
  },
  required: ["name", "baitText", "description", "seniority", "education", "city", "budget", "currency"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let techJob = req.body;


    const valid = ajv.validate(techJobSchema, techJob);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const existingTechJobs = techJobDao.list();
    const nameExists = existingTechJobs.some((existingTechJob) => existingTechJob.name === techJob.name);
    if (nameExists) {
      return res.status(400).json({
        code: "nameAlreadyExists",
        message: `Tech job with name "${techJob.name}" already exists.`,
      });
    }

   techJob = techJobDao.create(techJob);
    res.json(techJob);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
