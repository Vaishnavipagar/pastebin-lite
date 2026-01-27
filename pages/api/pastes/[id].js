import db from "../../../lib/db";
import { getNow } from "../../../lib/time";

export default function handler(req, res) {
  const { id } = req.query;
  const now = getNow(req);

  const paste = db.prepare(
    "SELECT * FROM pastes WHERE id = ?"
  ).get(id);

  if (!paste) return res.status(404).json({ error: "Not found" });

  if (paste.expires_at && now > paste.expires_at)
    return res.status(404).json({ error: "Expired" });

  if (paste.remaining_views !== null) {
    if (paste.remaining_views <= 0)
      return res.status(404).json({ error: "View limit exceeded" });

    db.prepare(
      "UPDATE pastes SET remaining_views = remaining_views - 1 WHERE id = ?"
    ).run(id);
    paste.remaining_views -= 1;
  }

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.remaining_views,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null
  });
}
