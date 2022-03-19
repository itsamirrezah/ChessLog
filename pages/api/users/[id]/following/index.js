import { follow, unFollow } from "../../../../../api-lib/database/relations";
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

export default handler;
