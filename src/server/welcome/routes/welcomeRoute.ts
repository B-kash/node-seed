import {Router} from "express";
import {WelcomeController} from "../controller/welcomeController";

export class WelcomeRoute{
    public router: Router;
    public welcomeController: WelcomeController = new WelcomeController();
    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get("/", this.welcomeController.getWelcomeMessage);
    }
}
