import { createServer } from "http";
import expressApp from "./express.js";

const server = createServer(expressApp);

export default server;
