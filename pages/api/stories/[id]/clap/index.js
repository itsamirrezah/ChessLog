import globalHandler from "../../../../../api-lib/nc";
import withAuth from "../../../../../api-lib/middlewares/auth";
import withDatabase from "../../../../../api-lib/middlewares/database";
import { clapStory } from "../../../../../api-lib/database/stories";
const handler = globalHandler();

handler.put(withAuth, withDatabase, async (req, res) => {
  const { id } = req.query;

  const result = await clapStory(req.db, id, req.user.id);
  if (!result.acknowledged) throw new Error("update error ");
  res.status(200).end();
});

export default handler;
