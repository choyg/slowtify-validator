import Ajv from "ajv";
import { HttpError, ValidateArg, Validator } from "slowtify";
export class JsonSchemaValidator implements Validator {
  constructor(private readonly ajv: Ajv) {}

  validate(arg: ValidateArg) {
    const schema = `#/definitions/${arg.paramMeta.name}`;
    const isValid = this.ajv.validate(schema, arg.data);
    if (isValid) {
      return arg.data;
    }

    throw new HttpError(400, this.ajv.errorsText(this.ajv.errors));
  }
}
