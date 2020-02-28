import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '..', '.env') });

import App from './app/client/App';

const app = new App({
	port: Number(process.env.PORT!),
	webhookURL: process.env.WEBHOOK_URL!,
});

app.init();
