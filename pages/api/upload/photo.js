import withCloudinary from "../../../api-lib/middlewares/cloudinary";
import withImageParser from "../../../api-lib/middlewares/image-parser";
import globalHandler from "../../../api-lib/nc";
const handler = globalHandler();

handler.post(
  withImageParser,
  withCloudinary("foo/test/hello/hello/"),
  (req, res) => {
    res.status(200).json({ cloudinary: req.cloudinaryUrl });
  }
);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
