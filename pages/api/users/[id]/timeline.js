import globalHandler from "../../../../api-lib/nc";
import withDatabase from "../../../../api-lib/middlewares/database";
import withAuth from "../../../../api-lib/middlewares/auth";
import { getTimeline } from "../../../../api-lib/database/stories";
import { getSavedStoryIds } from "../../../../api-lib/database/collections";

const handler = globalHandler();
handler.use(withDatabase);
handler.use(withAuth);

handler.get(async (req, res) => {
  const { id, ...pageParams } = req.query;

  if (req.user.id !== id) throw new Error("not authorize");

  const page = +pageParams.page;
  const limit = +pageParams.limit;

  const { stories, metadata } = await getTimeline(
    req.db,
    id,
    page,
    page * limit,
    limit
  );

  if (!metadata) throw new Error("feed");
  let veTimeline = stories;

  if (metadata.total > 0) {
    const collections = await getSavedStoryIds(req.db, id);

    veTimeline = stories.map((story) => ({
      ...story,
      isSaved: !!collections?.saved[story._id.toString()],
    }));
  }

  res.status(200).json({ stories: veTimeline, metadata });
});

export default handler;
