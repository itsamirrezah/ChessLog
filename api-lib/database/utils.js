import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_password}@cluster0.e5gtc.mongodb.net/blog?retryWrites=true&w=majority`
  );

  return client;
}

export function stories(client) {
  return client.db().collection("stories");
}

export function userRelations(client) {
  return client.db().collection("user-relations");
}

export function tags(client) {
  return client.db().collection("tags");
}

export function users(client) {
  return client.db().collection("users");
}

export function pagination(page, skip, limit, field = "stories") {
  return [
    {
      $facet: {
        metadata: [
          { $count: "total" },
          {
            $addFields: {
              nextPage: {
                $cond: [
                  { $gt: ["$total", (page + 1) * limit] },
                  page + 1,
                  false,
                ],
              },
            },
          },
        ],
        [field]: [{ $skip: skip }, { $limit: limit }],
      },
    },
    {
      // FIXME: look for simpler solution
      $project: {
        metadata: {
          $cond: [
            { $ne: ["$metadata", []] },
            "$metadata",
            { total: 0, nextPage: false },
          ],
        },
        [field]: 1,
      },
    },
    {
      $unwind: "$metadata",
    },
  ];
}

export function join(
  from,
  localField,
  foreignField,
  as,
  unwindAfterJoin = true
) {
  // FIXME: right join compatible
  return [
    {
      $lookup: {
        from,
        localField,
        foreignField,
        as,
      },
    },
    ...(unwindAfterJoin ? [{ $unwind: `$${as}` }] : []),
  ];
}

export function multipleOpFromList(list, callback) {
  return list.map((it) => callback(it));
}
