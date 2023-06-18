import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            _id: false,
        },
        username: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
        },
        urls: [
            {
                type: String,
                ref: "Url",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const userModel = model("User", userSchema);

export default userModel;
