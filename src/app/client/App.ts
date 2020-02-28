import bodyparser from 'body-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import { Logger } from 'winston';
import Controllers from '../controllers/Controllers';
import SuccessHandler from '../structures/SuccessHandler';
import { logger } from '../util/logger';
import DiscordWebhook from 'discord-webhook-ts';

interface AppOptions {
	port: number;
	webhookURL: string;
}

export default class App {
	public readonly app: Application = express();
	public readonly options: AppOptions;
	public readonly successHandler = new SuccessHandler(this);
	public readonly logger: Logger = logger;
	public readonly webhook: DiscordWebhook;

	public constructor(options: AppOptions) {
		this.options = options;
		this.webhook = new DiscordWebhook(options.webhookURL);
	}

	private _initMiddlewares(): Application {
		this.app
			.use(bodyparser.json())
			.use(bodyparser.urlencoded({ extended: true }))
			.use(helmet())
			.set('port', this.options.port);

		return this.app;
	}

	private _initControllers(): void {
		for (const Route of Controllers) {
			const controller = new Route(this);
			this.app.use(controller.path, controller.router);
		}
	}

	public async init(): Promise<void> {
		this._initMiddlewares();
		this._initControllers();
		this.app.listen(this.options.port, () => {
			this.logger.verbose(`[SERVER] Server live on port ${this.options.port}.`);
			this.successHandler.init();
		});
	}
}
