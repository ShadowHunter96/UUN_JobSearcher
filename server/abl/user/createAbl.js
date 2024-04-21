const Ajv = require("ajv");
const ajv = new Ajv();


const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    surname:{type:"string"},
    email: { type: "string" },
    

  },
  required: ["name", "email","surname"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let user = req.body;


    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.email === user.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} already exists`,
      });
      return;
    }

    user = userDao.create(user);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
