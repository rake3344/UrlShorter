import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.connect(url).then(() => {
        console.log("Connected to the database successfully");
    });
};

export default connectDB;
