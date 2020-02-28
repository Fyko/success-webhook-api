import { Router } from 'express';
import App from '../client/App';

export default class BaseController {
	public path: string;
	public router: Router;
	public app: App;

	public constructor(path: string, app: App) {
		this.path = path;
		this.router = Router();
		this.app = app;

		this.init();
	}

	public init(): void {
		throw new Error(`init() not implemented on ${this.path}`);
	}
}
