import nc from "next-connect";

const config = {
  onError: (err, req, res, next) => {
    console.log("err: ", err.message);
    if (!err.code)
      return res.status(500).json({ message: "something went wrong!" });
    return res.status(err.code).json({ message: err.message });
  },
};

export default function handler() {
  return nc(config);
}
