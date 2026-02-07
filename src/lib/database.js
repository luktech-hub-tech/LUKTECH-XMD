const fs = require("fs-extra");
const dbFile = "./database.json";

function loadDB() {
  if(!fs.existsSync(dbFile)) fs.writeJsonSync(dbFile, { users: {}, groups: {} });
  return fs.readJsonSync(dbFile);
}

function saveDB(data) {
  fs.writeJsonSync(dbFile, data, { spaces: 2 });
}

module.exports = { loadDB, saveDB };
