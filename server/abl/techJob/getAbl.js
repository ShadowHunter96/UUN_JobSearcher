const techJobDao = require("../../dao/techjob-dao.js");

async function GetAbl(req, res) {
  try {

    const techJobId = parseInt(req.params.id, 10);


    if (isNaN(techJobId)) {
      return res.status(400).json({
        code: "invalidId",
        message: "The 'id' must be a number.",
      });
    }


    const techJob = techJobDao.get(techJobId);
    if (!techJob) {

      return res.status(404).json({
        code: "techJobNotFound",
        message: `Tech job with ID ${techJobId} not found.`,
      });
    }


    res.json(techJob);
  } catch (e) {

    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
