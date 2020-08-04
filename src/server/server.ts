import express, {Express} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {WelcomeRoute} from "./routes/welcomeRoute";
import {UserRoutes} from "./user/userRoutes";
import pass from "passport";
import {AssignmentRoutes} from "./assignment/assignmentRoutes";

export class Server {
    private readonly app: Express;


    constructor() {
        // Add Express as your app
        this.app = express();
        this.configureServerMiddleware();
        this.manageRoutes();
        this.mongo();


    }

    loggerMiddleWare(requests: express.Request, response: express.Response, next: () => void): void {
        console.log(new Date() + ` ${requests.method} ${requests.path} ${requests.ip}`);
        next();
    }

    start(): void {
        const port = Number(process.env.SERVER_PORT ?? 8080);
        this.app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }

    private configureServerMiddleware(): void {
        // logger middleware
        this.app.use(this.loggerMiddleWare);
        // We will use passport middleware to do authentication
        this.app.use(pass.initialize());
        // We will be using body parser middleware to parse the requests into json
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
    }

    private manageRoutes(): void {
        this.app.use('/welcome', new WelcomeRoute().router);
        this.app.use('/users', new UserRoutes().router);
        this.app.use('/assignments', new AssignmentRoutes().router);
    }


    // DB CONNECTOR
    private mongo(): void {
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.info('MongoDB connection Established');
        });
        connection.on("reconnected", () => {
            console.info('MongoDB connection Reestablished');
        });
        connection.on("disconnected", () => {
            console.log('Mongo Connection Disconnected');
            console.info('Trying to reconnect to MONGO .....');

            setTimeout(() => {
                mongoose.connect(process.env.MONGODB_URL, {
                    autoReconnect: true, keepAlive: true, useNewUrlParser: true,
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000, useUnifiedTopology: true
                });
            }, 3000);
        });

        connection.on("close", () => {
            console.log('MongoDB connection is closed');
        });

        connection.on("error", (error: Error) => {
            console.log("MongoDB Connection Error: " + error);
        });

        const run = async () => {
            await mongoose.connect(process.env.MONGODB_URL, {
                autoReconnect: true, keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true
            });
        };

        run().catch(err => console.error(err));
    }
}
