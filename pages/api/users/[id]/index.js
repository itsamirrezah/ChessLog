import globalHandler from "../../../../api-lib/nc";
import withDatabase from "../../../../api-lib/middlewares/database";
import {
  getUserInfo,
  isUsernameAvailable,
  updateUser,
} from "../../../../api-lib/database/users";
import withValidation from "../../../../api-lib/middlewares/validate";
import { usernameValidity } from "../../../../api-lib/validation";
import withAuth from "../../../../api-lib/middlewares/auth";

const handler = globalHandler();
handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("no id");

  const user = await getUserInfo(req.db, id);
  if (!user) throw new Error("no user");

  res.status(200).json(user);
});

handler.put(withValidation(usernameValidity), withAuth, async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("bad request");
  if (req.user.id !== id) throw new Error("authorization error");
  const { username } = req.body;

  const available = await isUsernameAvailable(req.db, username);
  if (!available) throw new Error("username isn't available");
  const update = await updateUser(req.db, id, { username });

  if (!update) throw new Error("update user failed");

  res.status(200).end();
});

export default handler;
