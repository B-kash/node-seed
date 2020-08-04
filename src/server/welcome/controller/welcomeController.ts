import {Request, Response} from "express";
import {WelcomeService} from "../service/welcomeService";

export class WelcomeController {
    public welcomeService: WelcomeService = new WelcomeService();

    public getWelcomeMessage = async (req: Request, res: Response): Promise<void> => {
        res.send(this.welcomeService.getWelcomeMessage());
    };
}
