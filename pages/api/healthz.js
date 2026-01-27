import db from "../../lib/db";

export default function handler(req, res) {
  try {
    db.prepare("SELECT 1").get();
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
}
