import Ajv from "ajv";

export default function withValidation(schema) {
  const ajv = new Ajv();
  const schemaValidation = ajv.compile(schema);
  return (req, res, next) => {
    const validate = schemaValidation(req.body);
    if (validate) return next();

    throw new Error(schemaValidation.errors[0].message);
  };
}
