import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import {
    emailDtoSchema,
    passwordDtoSchema,
    usernameDtoSchema,
} from "../lib/dto-types.js";
import Ajv from "ajv";

const RegisterDTOSchema = Type.Object(
    {
        username: usernameDtoSchema,
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

const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);
    if (!isDTOValid) {
        return res.status(400).send({
            errors: validateSchema.errors.map((mes) => mes.message),
        });
    }
    next();
};

export default userRegisterDTO;
