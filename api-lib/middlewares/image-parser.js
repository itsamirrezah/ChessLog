import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }).single("image");

export default function withImageParser(req, res, next) {
  return upload(req, res, function (err) {
    if (err) return res.status(500).json({ message: err });
    next();
  });
}
