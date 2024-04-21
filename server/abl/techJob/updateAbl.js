const techJobDao = require("../../dao/techjob-dao.js");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);


const techJobSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    baitText: { type: "string" },
    description: { type: "string" },
    seniority: { type: "string" },
    education: { type: "string" },
    city: { type: "string" },
    budget: { type: "number" },
    currency: { type: "string" },
    approved: { type: "boolean" }
  },
  required: ["id", "name", "baitText", "description", "seniority", "education", "city", "budget", "currency"],
  additionalProperties: false
};

async function UpdateAbl(req, res) {
  try {
    let techJob = req.body;

    const techJobId = Number(req.params.id);
    if (isNaN(techJobId)) {
      return res.status(400).json({
        code: "invalidId",
        message: "The 'id' must be a number.",
      });
    }
    techJob.id = techJobId;


    const valid = ajv.validate(techJobSchema, techJob);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }
    

    const allTechJobs = techJobDao.list();
    const isNameTaken = allTechJobs.some(
      (existingTechJob) => existingTechJob.name === techJob.name && existingTechJob.id !== techJobId
    );

    if (isNameTaken) {
      return res.status(400).json({
        code: "nameConflict",
        message: `Another tech job with the name "${techJob.name}" already exists.`,
      });
    }

    const updatedTechJob = techJobDao.update(techJob);
    if (!updatedTechJob) {
      return res.status(404).json({
        code: "techJobNotFound",
        message: `Tech job with ID ${techJobId} not found`,
      });
    }

    res.json(updatedTechJob);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
