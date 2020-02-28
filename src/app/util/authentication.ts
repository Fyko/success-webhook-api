import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES, MESSAGS } from '../util/constants';

const KEYS = [process.env.LICENSE_KEY];

export function checkAuth(req: Request, res: Response, next: NextFunction) {
	const key = req.get('Authorization');
	if (key && KEYS.includes(key)) return next();
	return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGS.UNAUTHORIZED);
}
