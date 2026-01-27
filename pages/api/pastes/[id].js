import { getNow } from "../../../lib/time";
import { getPaste, updatePaste } from "../../../lib/db";

export default function handler(req, res) {
  const { id } = req.query;
  const now = getNow(req);

  const paste = getPaste(id);

  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  // TTL check
  if (paste.expires_at && now > paste.expires_at) {
    return res.status(404).json({ error: "Expired" });
  }

  // View count check
  if (paste.remaining_views !== null) {
    if (paste.remaining_views <= 0) {
      return res.status(404).json({ error: "View limit exceeded" });
    }

    paste.remaining_views -= 1;
    updatePaste(paste);
  }

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.remaining_views,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null
  });
}
