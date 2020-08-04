import {config} from "dotenv";
import {Server} from "./server/server";

async function main(): Promise<void> {
    // Setup the environment variables
    config();
    // Create a server
    const server: Server = new Server();
    // Start the server
    server.start();
}

void main();
