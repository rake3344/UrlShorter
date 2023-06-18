import mongoose from "mongoose";

const { Schema, model } = mongoose;

const urlSchema = new Schema(
    {
        urlCode: {
            type: String,
        },
        longUrl: {
            type: String,
        },
        shortUrl: {
            type: String,
        },
        clicks: {
            type: Number,
            required: true,
            default: 0,
        },
        date: {
            type: String,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const urlModel = model("Url", urlSchema);

export default urlModel;
