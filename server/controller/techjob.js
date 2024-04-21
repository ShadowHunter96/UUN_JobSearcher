const express = require("express");
const router = express.Router();


const GetAbl = require("../abl/techJob/getAbl");
const ListAbl = require("../abl/techJob/listAbl");
const CreateAbl = require("../abl/techJob/createAbl");
const UpdateAbl = require("../abl/techJob/updateAbl");
const DeleteAbl = require("../abl/techJob/deleteAbl");


router.get("/get", (req, res) => {
    GetAbl(req, res);
  });
  
  router.get("/list", (req, res) => {
    ListAbl(req, res);
  });
  
  router.post("/create", (req, res) => {
    CreateAbl(req, res);
  });
  
  router.put("/update/:id", (req, res) => {
    UpdateAbl(req, res);
  });
  
  router.delete("/delete/:id", (req, res) => {
    DeleteAbl(req, res);
  });
  
  router.get('/get/:id', GetAbl);

// Export routeru
module.exports = router;
