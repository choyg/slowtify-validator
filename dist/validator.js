"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchemaValidator = void 0;
const slowtify_1 = require("slowtify");
class JsonSchemaValidator {
    constructor(ajv) {
        this.ajv = ajv;
    }
    validate(arg) {
        const isValid = this.ajv.validate(arg.paramMeta.name, arg.data);
        if (isValid) {
            return arg.data;
        }
        throw new slowtify_1.HttpError(400, this.ajv.errorsText(this.ajv.errors));
    }
}
exports.JsonSchemaValidator = JsonSchemaValidator;
//# sourceMappingURL=validator.js.map