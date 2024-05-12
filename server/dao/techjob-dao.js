const fs = require("fs");
const path = require("path");


const techJobFolderPath = path.join(__dirname, "storage", "techjobList");

function ensureTechJobFolderExists() {
  if (!fs.existsSync(techJobFolderPath)) {
    fs.mkdirSync(techJobFolderPath, { recursive: true });
  }
}

function getMaxId() {
  ensureTechJobFolderExists();
  const files = fs.readdirSync(techJobFolderPath);
  const ids = files.map(file => parseInt(file.replace('.json', ''), 10));
  return ids.length > 0 ? Math.max(...ids) : 0;
}

function get(id) {
  const filePath = path.join(techJobFolderPath, `${id}.json`);
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw new Error('Failed to read tech job: ' + error.message);
  }
}

function create(techJob) {
  ensureTechJobFolderExists();
  const newId = getMaxId() + 1;
  techJob.id = newId;
  const filePath = path.join(techJobFolderPath, `${techJob.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(techJob), 'utf8');
  return techJob;
}

function update(techJob) {
  const filePath = path.join(techJobFolderPath, `${techJob.id}.json`);
  if (!fs.existsSync(filePath)) return null;
  fs.writeFileSync(filePath, JSON.stringify(techJob), 'utf8');
  return techJob;
}

function remove(id) {
  const filePath = path.join(techJobFolderPath, `${id}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

function list() {
  ensureTechJobFolderExists();
  const files = fs.readdirSync(techJobFolderPath);
  return files.map(file => {
    const filePath = path.join(techJobFolderPath, file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  });
}

function exists(techJobId) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(techJobFolderPath, `${techJobId}.json`);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err);
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
