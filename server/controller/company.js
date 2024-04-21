const express = require("express");
const router = express.Router();


const GetAbl = require("../abl/company/getAbl");
const ListAbl = require("../abl/company/listAbl");
const CreateAbl = require("../abl/company/createAbl");
const UpdateAbl = require("../abl/company/updateAbl");
const DeleteAbl = require("../abl/company/deleteAbl");

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