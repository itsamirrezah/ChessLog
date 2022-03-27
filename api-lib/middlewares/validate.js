import Ajv from "ajv";

export default function withValidation(schema, from) {
  const source = from || "body";
  const ajv = new Ajv();
  const schemaValidation = ajv.compile(schema);
  return (req, res, next) => {
    const validate = schemaValidation(req[source]);
    if (validate) return next();

    throw new Error(schemaValidation.errors[0].message);
  };
}
