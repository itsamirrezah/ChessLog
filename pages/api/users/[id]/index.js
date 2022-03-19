import globalHandler from "../../../../api-lib/nc";
import withDatabase from "../../../../api-lib/middlewares/database";
import { getUserInfo } from "../../../../api-lib/database/users";

const handler = globalHandler();
handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("no id");

  const user = await getUserInfo(req.db, id);
  if (!user) throw new Error("no user");

  res.status(200).json(user);
});

export default handler;
