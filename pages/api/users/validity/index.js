import { isUsernameAvailable } from "../../../../api-lib/database/users";
import globalHandler from "../../../../api-lib/nc";
import withDatabase from "../../../../api-lib/middlewares/database";
import withValidation from "../../../../api-lib/middlewares/validate";
import { usernameValidity } from "../../../../api-lib/validation";

const handler = globalHandler();

handler.get(
  withValidation(usernameValidity, "query"),
  withDatabase,
  async (req, res) => {
    const { username } = req.query;

    if (!username) throw new Error("bad request");

    const available = await isUsernameAvailable(req.db, username);
    res.status(200).json({
      available,
      message: `${username} is ${!available ? "not" : ""} available`,
    });
  }
);

export default handler;
