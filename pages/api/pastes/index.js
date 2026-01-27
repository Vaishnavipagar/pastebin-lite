import { nanoid } from "nanoid";
import { getNow } from "../../../lib/time";
import { insertPaste } from "../../../lib/db";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  const id = nanoid(8);
  const now = getNow(req);

  const expires_at = ttl_seconds ? now + ttl_seconds * 1000 : null;
  const remaining_views =
    typeof max_views === "number" ? max_views : null;

  const paste = {
    id,
    content,
    expires_at,
    remaining_views
  };

  insertPaste(paste);

  res.status(201).json({
    id,
    url: `${req.headers.origin}/p/${id}`
  });
}
