import globalHandler from "../../../../../api-lib/nc";
import withDatabase from "../../../../../api-lib/middlewares/database";
import { getUserFollowers } from "../../../../../api-lib/database/_users";
import followers from "../../../../../features/author-detail-sidebar/styled/followers";

const handler = globalHandler();
handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("bad request");

  const result = await getUserFollowers(req.db, id);
  if (!result) throw new Error("unknown error");
  return res.status(200).json({ followers: result, count: followers.length });
});

export default handler;
