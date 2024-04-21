const express = require("express");
const router = express.Router();

const getAbl = require("../abl/answer/getAbl");
const createAbl = require("../abl/answer/createAbl");

router.get("/get/:id", (req, res) => {
    getAbl(req, res);
  });

  router.post("/create", (req, res) => {
    createAbl(req, res);
  });

 
  

module.exports = router;
