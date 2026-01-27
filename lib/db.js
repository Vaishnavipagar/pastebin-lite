import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data.json");

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ pastes: [] }));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function insertPaste(paste) {
  const db = readDB();
  db.pastes.push(paste);
  writeDB(db);
}

export function getPaste(id) {
  const db = readDB();
  return db.pastes.find(p => p.id === id);
}

export function updatePaste(updated) {
  const db = readDB();
  db.pastes = db.pastes.map(p =>
    p.id === updated.id ? updated : p
  );
  writeDB(db);
}
