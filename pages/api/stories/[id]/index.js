import globalHandler from "../../../../api-lib/nc";
import withDatabase from "../../../../api-lib/middlewares/database";
import { getStoryById } from "../../../../api-lib/database/stories";

const handler = globalHandler();
handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id } = req.query;
  const story = await getStoryById(req.db, id);
  if (!story) return res.status(404).json({ message: "post not found" });

  res.status(200).json(story);
});

export default handler;
