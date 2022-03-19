import globalHandler from "../../../../api-lib/nc";
import withDatabase from "../../../../api-lib/middlewares/database";
import { getSession } from "next-auth/react";
import { suggestAuthors } from "../../../../api-lib/database/suggestions";

const handler = globalHandler();

handler.use(withDatabase);
handler.get(async (req, res) => {
  const session = await getSession({ req });

  const authors = await suggestAuthors(req.db, session?.user?.id);
  res.status(200).json(authors);
});

export default handler;
