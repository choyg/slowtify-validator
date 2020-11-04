import test from "ava";
import { resolve } from "path";
import { compileSchemas } from "../src";
import { JsonSchemaValidator } from "../src/validator";
import { UserClass } from "./fixtures/schema";

test("400s on invalid input", (t) => {
  const ajv = compileSchemas([resolve(__dirname, "fixtures/schema.ts")]);
  const validator = new JsonSchemaValidator(ajv);
  const err = t.throws(() =>
    validator.validate({
      argType: "queryparams",
      controller: () => {},
      data: {
        name: "",
        email: "",
      },
      paramMeta: UserClass,
      req: {} as any,
    })
  );
  t.deepEqual((err as any).statusCode, 400);
});

test("Returns validated data on success", (t) => {
  const ajv = compileSchemas([resolve(__dirname, "fixtures/schema.ts")]);
  const validator = new JsonSchemaValidator(ajv);
  const result = validator.validate({
    argType: "queryparams",
    controller: () => {},
    data: {
      name: "",
      email: "example@example.com",
      additional: true,
    },
    paramMeta: UserClass,
    req: {} as any,
  });

  t.deepEqual(result, {
    name: "",
    email: "example@example.com",
  });
});
