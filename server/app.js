const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;


const userController = require('./controller/user');
const techJobController = require('./controller/techjob');
const applicantController = require('./controller/applicant')
const companyController = require('./controller/company')
const answerController = require('./controller/answer')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.use('/user', userController);
app.use('/techjob', techJobController);
app.use('/applicant', applicantController);
app.use('/company', companyController);
app.use('/answer', answerController);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
