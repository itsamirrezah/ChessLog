import { addLike } from "../../../../api-lib/database/posts";
import { findUserByEmail } from "../../../../api-lib/database/_users";
import { connectDatabase } from "../../../../api-lib/database/utils";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { user } = req.body;
    const { id } = req.query;
    if (!user) {
      res.status(422).end();
      return;
    }
    const client = await connectDatabase();
    if (!(await findUserByEmail(client, user.email))) {
      res.status(422).end();
      return;
    }
    const result = await addLike(client, id, user);

    if (!result) {
      res.status(500).end();
      return;
    }

    res.status(200).end();
  }
}
