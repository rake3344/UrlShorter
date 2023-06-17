import { createServer } from "http";
import expressApp from "./express";

const server = createServer(expressApp);

export default server;
