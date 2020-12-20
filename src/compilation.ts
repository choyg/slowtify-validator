import Ajv, { AnySchema } from "ajv";
import addFormats from "ajv-formats";
import * as TJS from "typescript-json-schema";

export function compileSchemas(files: string[]): Ajv {
  const options: TJS.PartialArgs = {
    required: true,
    strictNullChecks: true,
    defaultNumberType: "integer",
    ignoreErrors: false,
  };

  const program = TJS.getProgramFromFiles(files, null);

  const generator = TJS.buildGenerator(program, options);
  if (!generator) {
    throw new Error("Failed to generate json schema from TypeScript");
  }

  const symbols = generator.getMainFileSymbols(program);
  const schemas = generator.getSchemaForSymbols(symbols).definitions;
  /* istanbul ignore if */
  if (!schemas) {
    throw new Error("Failed to retrieve generated schemas");
  }
  const namespaced = Object.entries(schemas).reduce<{
    [key: string]: AnySchema;
  }>((acc, [schema, def]) => {
    acc[`#/definitions/${schema}`] = def;
    return acc;
  }, {});

  const ajv = new Ajv({
    schemas: namespaced,
    removeAdditional: "all",
    validateSchema: true,
    validateFormats: true,
    coerceTypes: "array",
    strict: true,
  });
  addFormats(ajv);

  return ajv;
}
