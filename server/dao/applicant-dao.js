const fs = require("fs");
const path = require("path");


const applicantFolderPath = path.join(__dirname, "storage", "applicantList");

function ensureApplicantFolderExists() {
  if (!fs.existsSync(applicantFolderPath)) {
    fs.mkdirSync(applicantFolderPath, { recursive: true });
  }
}

function getMaxId() {
  ensureApplicantFolderExists();
  const files = fs.readdirSync(applicantFolderPath);
  const ids = files.map(file => parseInt(file.replace('.json', ''), 10));
  return ids.length > 0 ? Math.max(...ids) : 0;
}

function get(id) {
  const filePath = path.join(applicantFolderPath, `${id}.json`);
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw new Error('Failed to read applicant: ' + error.message);
  }
}

function create(applicant) {
  ensureApplicantFolderExists();
  const newId = getMaxId() + 1;
  applicant.id = newId;
  const filePath = path.join(applicantFolderPath, `${applicant.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(applicant), 'utf8');
  return applicant;
}

function update(applicant) {
  const filePath = path.join(applicantFolderPath, `${applicant.id}.json`);
  if (!fs.existsSync(filePath)) return null; 
  fs.writeFileSync(filePath, JSON.stringify(applicant), 'utf8');
  return applicant;
}

function remove(id) {
  const filePath = path.join(applicantFolderPath, `${id}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

function list() {
  ensureApplicantFolderExists();
  const files = fs.readdirSync(applicantFolderPath);
  return files.map(file => {
    const filePath = path.join(applicantFolderPath, file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  });
}

function exists(applicantId) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(applicantFolderPath, `${applicantId}.json`);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  exists
};
