// https://www.npmjs.com/package/express-validation
// https://github.com/hapijs/joi
// https://github.com/hapijs/joi/blob/v13.1.1/API.md
import * as Joi from 'joi';
import * as joiValidate from 'express-validation';
export const ignoredStrings = ['undefined', 'null', 'false'];

interface SignUpParamShape {
    body: {
        userName: Joi.StringSchema,
        passWord: Joi.StringSchema,
        firstName: Joi.StringSchema,
        lastName: Joi.StringSchema,
        country: Joi.StringSchema,
        email: Joi.StringSchema,
        gender: Joi.StringSchema
    }
}

export function signUpJoiSchema(): SignUpParamShape {
    let nameTypeValidation = Joi.string().min(5).max(20).trim().required().invalid(ignoredStrings);
    return {
            body: {
                userName: nameTypeValidation,
                // apply password regex
                passWord: nameTypeValidation,
                firstName: nameTypeValidation,
                lastName: nameTypeValidation,
                country: nameTypeValidation,
                // apply email regex
                email: Joi.string().email().trim().required().invalid(ignoredStrings),
                gender: Joi.string().min(4).max(6).trim().required().invalid(ignoredStrings).valid(['male','female'])
            }
    };
}

export function signUpJoiSchemaValidationMiddleware() {
	return joiValidate(signUpJoiSchema());
}