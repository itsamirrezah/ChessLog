import globalHandler from "../../../../../api-lib/nc";
import withDatabase from "../../../../../api-lib/middlewares/database";
import { getUserFollowers } from "../../../../../api-lib/database/relations";

const handler = globalHandler();
handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id, ...pageParams } = req.query;
  if (!id) throw new Error("bad request");
  const page = +pageParams.page;
  const limit = +pageParams.limit;

  const followers = await getUserFollowers(
    req.db,
    id,
    page,
    page * limit,
    limit
  );
  return res.status(200).json(followers);
});

export default handler;
