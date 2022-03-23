import globalHandler from "../../../../../api-lib/nc";
import withAuth from "../../../../../api-lib/middlewares/auth";
import withDatabase from "../../../../../api-lib/middlewares/database";
import { clapStory } from "../../../../../api-lib/database/stories";
import { clapValidation } from "../../../../../api-lib/validation";
import withValidation from "../../../../../api-lib/middlewares/validate";
const handler = globalHandler();

handler.put(
  withValidation(clapValidation),
  withAuth,
  withDatabase,
  async (req, res) => {
    const { id } = req.query;
    const { userClaps } = req.body;

    const result = await clapStory(req.db, id, req.user.id, userClaps);
    if (!result.acknowledged) throw new Error("update error ");
    res.status(200).end();
  }
);

export default handler;
