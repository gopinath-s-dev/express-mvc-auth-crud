import Ajv from "ajv";

const ajv = new Ajv({
  strict: true,
  allErrors: true,
  useDefaults: true,
  coerceTypes: true,
  removeAdditional: true,
});

ajv.addKeyword({
  keyword: "checkValidEmail",
  type: "string",
  schemaType: "boolean",
  validate: (_, data) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data),
});

ajv.addKeyword({
  keyword: "removeKey",
  modifying: true,
  schemaType: "boolean",
  validate: (schema, data, parentSchema, dataCxt) => {
    if (schema && dataCxt.parentData && dataCxt.parentDataProperty)
      delete dataCxt.parentData[dataCxt.parentDataProperty];
    return true;
  },
});

ajv.addKeyword({
  keyword: "formatDate",
  modifying: true,
  schemaType: "boolean",
  validate: (schema, data, parentSchema, dataCtx) => {
    if (!schema) dataCtx.parentData[dataCtx.parentDataProperty] = new Date();
    return true;
  },
});

const userSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    emailId: { type: "string", checkValidEmail: true },
    password: { type: "string", minLength: 8 },
    created_at: { formatDate: false, default: new Date() },
    updated_at: { formatDate: false, default: new Date() },
    _convertSchemaByCreate: {
      type: "string",
      enum: ["create"],
      removeKey: true,
    },
  },
};

export default ajv.compile(userSchema);
