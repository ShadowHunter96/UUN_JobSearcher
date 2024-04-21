const techJobDao = require("../../dao/techjob-dao.js");

async function DeleteAbl(req, res) {
  try {

    const techJobId = parseInt(req.params.id, 10);
    if (isNaN(techJobId)) {
      return res.status(400).json({
        message: "Invalid tech job ID format",
      });
    }


    const techJobExists = techJobDao.get(techJobId);
    if (!techJobExists) {

      return res.status(404).json({ message: `Tech job with ID ${techJobId} not found` });
    }


    techJobDao.remove(techJobId);

    res.status(200).json({ message: `Tech job with ID ${techJobId} deleted` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
