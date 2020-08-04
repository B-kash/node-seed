import express, {Express} from "express";
import bodyParser from "body-parser";
import {WelcomeRoute} from "./welcome/routes/welcomeRoute";


export class Server {
    private readonly app: Express;


    constructor() {
        // Add Express as your app
        this.app = express();
        this.configureServerMiddleware();
        this.manageRoutes();


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
        // We will be using body parser middleware to parse the requests into json
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
    }

    private manageRoutes(): void {
        this.app.use('/welcome', new WelcomeRoute().router);
    }

}
