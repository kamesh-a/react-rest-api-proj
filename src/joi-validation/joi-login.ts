// https://www.npmjs.com/package/express-validation
// https://github.com/hapijs/joi
// https://github.com/hapijs/joi/blob/v13.1.1/API.md
import * as Joi from 'joi';
import * as joiValidate from 'express-validation';
export const ignoredStrings = ['undefined', 'null', 'false'];

export function loginJoiSchema(){
    return {
            body: {
                userName: Joi.string().min(5).max(20).trim().required().invalid(ignoredStrings),
                // we could do better password regex with more restriction in place, 
                // for case simplicity I have opted to this.
                passWord: Joi.string().min(6).max(30).trim().required().invalid(ignoredStrings)
            }
    };
}

export function loginJoiSchemaValidationMiddleware() {
	return joiValidate(loginJoiSchema());
}