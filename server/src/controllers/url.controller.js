import "../config/env.js";
import { generate } from "shortid";
import validateUrl from "../helper/validateUrl.js";
import urlModel from "../schemas/url.schema.js";
import userModel from "../schemas/user.schema.js";

const shortUrl = async (req, res) => {
    const { origenUrl } = req.body;
    const { id } = req;
    const base = process.env.BASE_URL;
    const urlId = generate();

    if (validateUrl(origenUrl)) {
        try {
            const userExists = await userModel.findOne({ _id: id }).exec();
            if (!userExists) return res.status(404).send("Unauthorized");
            const url = await urlModel.findOne({ origenUrl }).exec();
            if (url) {
                res.status(200).json(url);
                userExists.urls.push(url._id);
            } else {
                const shortUrl = `${base}/${urlId}`;
                const url = new urlModel({
                    urlCode: urlId,
                    longUrl: origenUrl,
                    shortUrl,
                    date: new Date(),
                });
                userExists.urls.push(url._id);
                await url.save();
                await userExists.save();
                res.status(200).json(url);
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Invalid Origin url" });
    }
};

const redirectUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const url = await urlModel.findOne({ urlCode: code }).exec();
        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).send("Url not found");
        }
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const deleteUrl = async (req, res) => {
    try {
        const { id } = req;
        const { urlId } = req.params;
        const userExists = await userModel.findOne({ _id: id }).exec();
        if (!userExists) return res.status(404).send("Unauthorized");
        const url = await urlModel.findOne({ _id: urlId }).exec();
        if (!url) return res.status(404).send("Url not found");
        await urlModel.findByIdAndDelete(urlId).exec();
        const user = await userModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $pull: {
                    urls: urlId,
                },
            },
            {
                new: true,
            }
        );
        if (!user) return res.status(404).send("User not found");
        return res.status(200).send("Url deleted");
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const getUrls = async (req, res) => {
    try {
        const { id } = req;
        const userExists = await userModel.findOne({ _id: id }).exec();
        if (!userExists) return res.status(404).send("Unauthorized");
        if (userExists.role !== "admin") {
            const urls = await urlModel
                .find({ _id: { $in: userExists.urls } })
                .exec();
            return res.status(200).json(urls);
        } else {
            const urls = await urlModel.find({}).exec();
            return res.status(200).json(urls);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

export { shortUrl, redirectUrl, deleteUrl, getUrls };
