const express = require("express");
const router = express.Router();


const GetAbl = require("../abl/applicant/getAbl");
const ListAbl = require("../abl/applicant/listAbl");
const CreateAbl = require("../abl/applicant/createAbl");
const UpdateAbl = require("../abl/applicant/updateAbl");
const DeleteAbl = require("../abl/applicant/deleteAbl");


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


module.exports = router;