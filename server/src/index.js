import server from "./config/http";
import connectDB from "./config/db";
import "./config/env";

const boostrap = () => {
    connectDB(process.env.MONGO_URI);
    server.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
};

boostrap();
