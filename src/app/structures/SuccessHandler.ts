import App from '../client/App';
import Collection from '@discordjs/collection';
import { Embed } from 'discord-webhook-ts';

export default class SuccessHandler {
	protected readonly app: App;

	protected readonly embeds: Collection<string, Embed> = new Collection();

	protected interval!: NodeJS.Timeout;

	protected _rate: number;

	public constructor(app: App, { rate = 2000 } = {}) {
		this.app = app;
		this._rate = rate;
	}

	public get uuid() {
		return Date.now().toString(36);
	}

	public add(embed: Embed) {
		this.embeds.set(this.uuid, embed);
	}

	private async _check(): Promise<void> {
		if (!this.embeds.size) return;
		const embeds = this.embeds.first(10); // because a webhook can take 10 embeds per post request
		this.embeds.sweep(e => embeds.includes(e));
		try {
			await this.app.webhook.execute({ embeds });
			this.app.logger.success(`Successfully sent ${embeds.length} embeds!`);
		} catch (err) {
			this.app.logger.error(`[SUCCESS HANDLER]: ${err}`);
			console.error(err);
		}
	}

	public async init(): Promise<void> {
		this._check();
		this.interval = setInterval(this._check.bind(this), this._rate);
		this.app.logger.success('Successfully launched success handler.');
	}
}
