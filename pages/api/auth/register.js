import { insertUser, findUserByEmail } from "../../../api-lib/database/users";
import withDatabase from "../../../api-lib/middlewares/database";
import globalHandler from "../../../api-lib/nc";
import { signupValidation } from "../../../api-lib/validation";
import withValidation from "../../../api-lib/middlewares/validate";

const handler = globalHandler();

handler.post(
  withValidation(signupValidation),
  withDatabase,
  async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(req.db, email);

    if (user)
      throw new Error(
        `${email} is already registered. try with another email.`
      );

    const result = await insertUser(req.db, email, password);
    if (!result) throw new Error("error while inserting user");

    res.status(201).json({ insertedId: result });
  }
);

export default handler;
