import Ajv from "ajv";
import { ValidateArg, Validator } from "slowtify";
export declare class JsonSchemaValidator implements Validator {
    private readonly ajv;
    constructor(ajv: Ajv);
    validate(arg: ValidateArg): unknown;
}
