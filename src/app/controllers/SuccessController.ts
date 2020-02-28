/* eslint-disable comma-dangle */
import BaseController from './BaseController';
import { Request, Response } from 'express';
import App from '../client/App';
import { checkAuth } from '../util/authentication';
import { STATUS_CODES, MESSAGS } from '../util/constants';
import { Embed } from 'discord-webhook-ts';

export default class SuccessController extends BaseController {
	public constructor(app: App) {
		super('/success', app);
	}

	public init(): void {
		this.router.post('/', checkAuth, this._handleSuccess.bind(this));
	}

	private _handleSuccess(req: Request, res: Response): Response | void {
		this.app.successHandler.add(req.body.embed as Embed);
		return res.status(STATUS_CODES.SUCCESS).send(MESSAGS.SUCCESS);
	}
}
