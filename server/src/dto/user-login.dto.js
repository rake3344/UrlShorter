import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { emailDtoSchema, passwordDtoSchema } from "../lib/dto-types.js";

const LoginDTOSchema = Type.Object(
    {
        email: emailDtoSchema,
        password: passwordDtoSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "No se permiten propiedades adicionales",
        },
    }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email", "uuid"]).addKeyword("kind").addKeyword("modifier");
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addErrors(ajv);

const validateSchema = ajv.compile(LoginDTOSchema);

const userLoginDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);
    if (!isDTOValid) {
        return res.status(400).send({
            errors: validateSchema.errors.map((mes) => mes.message),
        });
    }
    next();
};

export default userLoginDTO;
