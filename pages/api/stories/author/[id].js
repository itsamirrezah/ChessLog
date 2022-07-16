import { getStoriesByAuthor } from "../../../../api-lib/database/stories";
import withDatabase from "../../../../api-lib/middlewares/database";
import globalHandler from "../../../../api-lib/nc";

const handler = globalHandler();
handler.use(withDatabase);

handler.get(async (req, res) => {
  const { id, ...pageParams } = req.query;
  if (!id) throw new Error("bad request!");

  const page = +pageParams.page;
  const limit = +pageParams.limit;

  const stories = await getStoriesByAuthor(
    req.db,
    id,
    page,
    page * limit,
    limit
  );
  if (!stories) throw new Error("no stories");

  res.status(200).json(stories);
});

export default handler;
