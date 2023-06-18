import server from "./config/http.js";
import connectDB from "./config/db.js";
import "./config/env.js";

const boostrap = () => {
    connectDB(process.env.MONGO_URI);
    server.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
};

boostrap();
