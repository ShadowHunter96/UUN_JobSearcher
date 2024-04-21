const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "userList");

function ensureUserFolderExists() {
  if (!fs.existsSync(userFolderPath)) {
    fs.mkdirSync(userFolderPath, { recursive: true });
  }
}

function getMaxId() {
  ensureUserFolderExists();

  const files = fs.readdirSync(userFolderPath);
  const ids = files
    .map(file => file.replace('.json', ''))
    .map(Number)
    .filter(id => !isNaN(id));

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId;
}


function get(userId) {
  try {

    const fileName = userId.toString() + '.json';
    const filePath = path.join(userFolderPath, fileName);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') {

      return null;
    }

    throw new Error('Failed to read user: ' + error.message);
  }
}

function create(user) {
  ensureUserFolderExists();

  try {
    const newId = getMaxId() + 1;
    user.id = newId;

    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
}

function update(user) {
  try {
    const currentUser = get(user.id);
    if (!currentUser) return null;
    const newUser = { ...currentUser, ...user };
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(newUser);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newUser;
  } catch (error) {
    throw { code: "failedToUpdateUser", message: error.message };
  }
}


function remove(userId) {
  try {
    const filePath = path.join(userFolderPath, `${userId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveUser", message: error.message };
  }
}


function list() {
  try {
    const files = fs.readdirSync(userFolderPath);
    const userList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return userList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
