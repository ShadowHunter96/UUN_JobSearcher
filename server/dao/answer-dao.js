const fs = require("fs");
const path = require("path");

const answersFolderPath = path.join(__dirname, "storage", "answerList");

function ensureAnswersFolderExists() {
  if (!fs.existsSync(answersFolderPath)) {
    fs.mkdirSync(answersFolderPath, { recursive: true });
  }
}

function create(answer) {
  ensureAnswersFolderExists();

  function list() {
    ensureAnswersFolderExists();
    const files = fs.readdirSync(answersFolderPath);
    return files.map(file => {
      const filePath = path.join(answersFolderPath, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    });
  }

  const existingAnswers = list();
  const isDuplicate = existingAnswers.some(existingAnswer =>
    existingAnswer.techJobId === answer.techJobId && existingAnswer.applicantId === answer.applicantId
  );

  if (isDuplicate) {
    console.error('Duplicate answer found. Aborting creation.');
    throw new Error(`Duplicate entry: An answer for TechJob ID ${answer.techJobId} and Applicant ID ${answer.applicantId} already exists.`);
  }


  const newId = Date.now();
  answer.id = newId;

  const filePath = path.join(answersFolderPath, `${answer.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(answer), "utf8");
  return answer;
}

function get(id) {
  const filePath = path.join(answersFolderPath, `${id}.json`);
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw new Error('Failed to read answer: ' + error.message);
  }
}

function listByTechJobId(techJobId) {
  ensureAnswersFolderExists();
  const files = fs.readdirSync(answersFolderPath);
  return files.map(file => {
    const filePath = path.join(answersFolderPath, file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const answer = JSON.parse(fileData);
    return answer.techJobId === techJobId ? answer : null;
  }).filter(answer => answer !== null);
}


module.exports = {
  create,
  get,
  listByTechJobId
};
