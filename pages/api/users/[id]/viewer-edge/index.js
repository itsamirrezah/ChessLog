import globalHandler from "../../../../../api-lib/nc";
import withDatabase from "../../../../../api-lib/middlewares/database";
import withAuth from "../../../../../api-lib/middlewares/auth";
import { isFollowing } from "../../../../../api-lib/database/_users";
import { getSession } from "next-auth/react";

const handler = globalHandler();
// handler.use(withAuth);
handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("bad request");

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(200)
      .json({ isViewerUser: false, isViewerFollow: false, isAllowed: true });
  }

  if (session.user.id === id) {
    return res
      .status(200)
      .json({ isViewerUser: true, isViewerFollow: false, isAllowed: false });
  }

  res.status(200).json({
    isViewerUser: true,
    isViewerFollow: await isFollowing(req.db, session.user.id, id),
    isAllowed: true,
  });
});

export default handler;
