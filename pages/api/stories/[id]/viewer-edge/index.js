import globalHandler from "../../../../../api-lib/nc";
import withDatabase from "../../../../../api-lib/middlewares/database";
import { getSession } from "next-auth/react";
import { getStoryActionsByUser } from "../../../../../api-lib/database/stories";

const handler = globalHandler();

handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id } = req.query;
  const session = await getSession({ req });
  if (!session) {
    return res.status(200).json({
      isClap: false,
      claps: 0,
      isBookmark: false,
    });
  }

  const result = await getStoryActionsByUser(req.db, session.user.id, id);
  res.status(200).json({
    isClap: result.userClaps > 0,
    claps: result.userClaps,
    isBookmark: result.userSaved,
  });
});

export default handler;
