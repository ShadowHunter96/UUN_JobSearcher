const fs = require("fs");
const path = require("path");


const companyFolderPath = path.join(__dirname, "storage", "companyList");

function ensureCompanyFolderExists() {
  if (!fs.existsSync(companyFolderPath)) {
    fs.mkdirSync(companyFolderPath, { recursive: true });
  }
}

function getMaxId() {
  ensureCompanyFolderExists();
  const files = fs.readdirSync(companyFolderPath);
  const ids = files.map(file => parseInt(file.replace('.json', ''), 10));
  return ids.length > 0 ? Math.max(...ids) : 0;
}

function get(id) {
  const filePath = path.join(companyFolderPath, `${id}.json`);
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw new Error('Failed to read company: ' + error.message);
  }
}

function create(company) {
  ensureCompanyFolderExists();
  const newId = getMaxId() + 1;
  company.id = newId;
  const filePath = path.join(companyFolderPath, `${company.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(company), 'utf8');
  return company;
}

function update(company) {
  const filePath = path.join(companyFolderPath, `${company.id}.json`);
  if (!fs.existsSync(filePath)) return null;
  fs.writeFileSync(filePath, JSON.stringify(company), 'utf8');
  return company;
}

function remove(id) {
  const filePath = path.join(companyFolderPath, `${id}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

function list() {
  ensureCompanyFolderExists();
  const files = fs.readdirSync(companyFolderPath);
  return files.map(file => {
    const filePath = path.join(companyFolderPath, file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  });
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
