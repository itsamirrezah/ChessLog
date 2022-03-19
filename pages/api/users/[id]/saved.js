import withAuth from "../../../../api-lib/middlewares/auth";
import withDatabase from "../../../../api-lib/middlewares/database";
import globalHandler from "../../../../api-lib/nc";
import { saveStory } from "../../../../api-lib/database/collections";
import { getRecentlySavedStories } from "../../../../api-lib/database/collections";

const handler = globalHandler();
handler.use(withDatabase);
handler.use(withAuth);

handler.put(async (req, res) => {
  const { id } = req.query;
  if (id !== req.user.id) throw new Error("user is not authorize");

  const { storyId, isSaved } = req.body;
  if (!storyId || isSaved === undefined) throw new Error("Bad Request");

  const result = await saveStory(req.db, id, storyId, isSaved);
  if (!result) throw new Error("update error");

  return res.status(200).end();
});

handler.get(async (req, res) => {
  const { id } = req.query;
  if (id !== req.user.id) throw new Error("user is not authorize");
  const stories = await getRecentlySavedStories(req.db, id);
  if (!stories) throw new Error("get error");
  res.status(200).json(stories);
});

export default handler;
