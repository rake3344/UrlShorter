import { v4 as uuidv4 } from "uuid";
import userModel from "../schemas/user.schema.js";
import { hash, compare } from "bcrypt";
import { SignJWT } from "jose";
import "../config/env.js";

const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    const uuid = uuidv4();
    const emailExists = await userModel.findOne({ email }).exec();
    if (emailExists)
        return res.status(404).send("Ya existe un usuario con ese email");
    const usernameExists = await userModel.findOne({ username }).exec();
    if (usernameExists)
        return res.status(404).send("Ya existe un usuario con ese username");
    const hashed = await hash(password, 12);
    const user = new userModel({
        _id: uuid,
        username,
        email,
        password: hashed,
    });
    const isFirstUser = (await userModel.countDocuments({}).exec()) === 0;
    if (isFirstUser) user.role = "admin";
    await user.save();
    return res.status(201).send("Registro exitoso");
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await userModel.findOne({ email }).exec();
    if (!userExists) return res.status(404).send("Credenciales incorrectas");
    const passValid = await compare(password, userExists.password);
    if (!passValid) return res.status(404).send("Credenciales incorrectas");
    const jwtConstructor = new SignJWT({
        id: userExists._id,
    });
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
        .setProtectedHeader({
            alg: "HS256",
            type: "JWT",
        })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(encoder.encode(process.env.SECRET));
    return res.status(200).send({
        jwt,
    });
};

const getUsers = async (req, res) => {
    try {
        const { id } = req;
        const user = await userModel.findOne({ _id: id }).exec();
        if (user.role !== "admin") return res.status(401).send("Unauthorized");
        const users = await userModel
            .find({})
            .populate("urls", "urlCode longUrl shortUrl clicks date")
            .exec();
        const usersToSend = users.map((user) => {
            return {
                username: user.username,
                email: user.email,
                role: user.role,
                urls: user.urls,
            };
        });
        return res.status(200).send(usersToSend);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

export { userRegister, userLogin, getUsers };
