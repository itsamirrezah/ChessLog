import { tags } from "./utils";

export async function searchTagsByName(client, query, limit = 5) {
  const result = await tags(client)
    .aggregate([
      {
        $match: {
          name: {
            $regex: new RegExp(query, "i"),
          },
        },
      },
      { $project: { _id: { $toString: "$_id" }, name: 1 } },
      { $limit: limit },
    ])
    .toArray();

  return result;
}
