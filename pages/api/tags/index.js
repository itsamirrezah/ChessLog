import { searchTagsByName } from "../../../api-lib/database/tags";
import withDatabase from "../../../api-lib/middlewares/database";
import globalHandler from "../../../api-lib/nc";

const handler = globalHandler();

handler.get(withDatabase, async (req, res) => {
  const { q } = req.query;
  if (!q) throw new Error("bad request");

  const tags = await searchTagsByName(req.db, q, 5);

  res.status(200).json(tags);
});

export default handler;
