import { io } from "socket.io-client";
import Env from "./env";
const socket = io(Env.SERVER_URL);
export default socket;
