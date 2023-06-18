import { Type } from "@sinclair/typebox";

export const usernameDtoSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: "El nombre debe tener al menos 2 caracteres",
        maxLength: "El nombre no debe tener mas de 20 caracteres",
    },
});

export const emailDtoSchema = Type.String({
    format: "email",
    errorMessage: {
        type: "El tipo de email no es valido",
        format: "El formato de email no es valido, debe cumplir el RFC 5322",
    },
});

export const passwordDtoSchema = Type.String({
    format: "password",
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: "El tipo de password no es valido",
        format: "El formato de password no es valido, debe tener al menos 10 caracteres, una mayuscula, una minuscula y un numero",
        minLength: "El password debe tener al menos 10 caracteres",
        maxLength: "El password no debe tener mas de 25 caracteres",
    },
});
