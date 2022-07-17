import {
  follow,
  getUserFollowing,
  unFollow,
} from "../../../../../api-lib/database/relations";
import withDatabase from "../../../../../api-lib/middlewares/database";
import globalHandler from "../../../../../api-lib/nc";
import withAuth from "../../../../../api-lib/middlewares/auth";

const handler = globalHandler();
handler.use(withDatabase);
handler.use(withAuth);

handler.put(async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("bad request");
  const result = await follow(req.db, req.user.id, id);
  if (!result) throw new Error("unknown error");
  res.status(200).end();
});

handler.delete(async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("bad request");
  const result = await unFollow(req.db, req.user.id, id);
  if (!result) throw new Error("unknown error");
  res.status(200).end();
});

handler.get(async (req, res) => {
  const { id, ...pageParams } = req.query;
  if (!id) throw new Error("bad request");
  const page = +pageParams.page;
  const limit = +pageParams.limit;

  const result = await getUserFollowing(req.db, id, page, page * limit, limit);
  if (!result) throw new Error("no result");
  res.status(200).json(result);
});

export default handler;
