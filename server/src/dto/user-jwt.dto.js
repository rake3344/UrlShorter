import { jwtVerify } from "jose";
import "../config/env.js";

const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ errors: ["No estas autorizado"] });
    const jwt = authorization.split(" ")[1];
    if (!jwt) return res.status(401).send({ errors: ["No estas autorizado"] });
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(
            jwt,
            encoder.encode(process.env.SECRET)
        );
        req.id = payload.id;
        next();
    } catch (error) {
        return res.status(401).send({ errors: ["No estas autorizado"] });
    }
};

export default userJWTDTO;
