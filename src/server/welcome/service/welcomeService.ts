export class WelcomeService {
    getWelcomeMessage(): string {
        return 'Welcome to the node seed ' + process.env.API_VERSION;
    }
}
