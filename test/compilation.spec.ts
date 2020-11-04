import test from "ava";
import { resolve } from "path";
import { compileSchemas } from "../src/";

test("Returns AJV loaded with schema", (t) => {
  const { schemas } = compileSchemas([
    resolve(__dirname, "fixtures/schema.ts"),
  ]);

  t.assert(schemas.UserClass);
  t.assert(schemas.LaptopInterface);
  t.assert(schemas.Ref);
});

test("Validation actually works", (t) => {
  const ajv = compileSchemas([resolve(__dirname, "fixtures/schema.ts")]);

  // Passes
  ajv.validate("LaptopInterface", {
    id: 3,
  });
  t.is(ajv.errors, null);

  // Missing required
  ajv.validate("LaptopInterface", {});
  t.assert(ajv.errors);

  // Not an integer
  ajv.validate("LaptopInterface", {
    id: 3.3,
  });
  t.assert(ajv.errors);
});

test("Loads AJV formats", (t) => {
  const ajv = compileSchemas([resolve(__dirname, "fixtures/schema.ts")]);

  // Passes
  ajv.validate("UserClass", {
    name: "name",
    email: "test@example.com",
  });
  t.is(ajv.errors, null);

  // Not valid Email
  ajv.validate("UserClass", {
    name: "name",
    email: "test@example",
  });
  t.deepEqual(ajv.errors, [
    {
      keyword: "format",
      dataPath: "/email",
      schemaPath: "#/properties/email/format",
      params: { format: "email" },
      message: 'should match format "email"',
    },
  ]);
});

test("Does not error if no schemas are found", (t) => {
  compileSchemas([]);
  t.pass();
});

test("Errors if TS compilation fails", (t) => {
  t.throws(() => compileSchemas([resolve(__dirname, "fixtures/badSchema.ts")]));
});
