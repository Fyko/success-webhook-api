/* eslint-disable */
const fetch = require('node-fetch');

const items = [];

async function sendEmbed() {
	const item = items[Math.round(Math.random() * items.length)];

	const embed = {
		title: 'Successful Checkout',
		description: item.name,
		fields: [
			{
				name: 'Checkout Speed',
				value: `${Math.round(Math.random() * 1230)}ms`,
				inline: true
			}
		],
		thumbnail: {
			url: `https:${item.image_url_hi}`.replace('/rc/', '/zo/')
		},
		color: 3066993,
	}

	const req = await fetch('http://localhost:3000/success', {
		method: 'POST',
		headers: { Authorization: '', 'Content-Type': 'application/json' },
		body: JSON.stringify({ embed })
	});
	console.log(req.status);
}

(async () => {
	const request = await fetch('https://supremenewyork.com/mobile_stock.json');
	const json = await request.json();
	const itemMap = Object.values(json.products_and_categories).flatMap(i => i);
	for (const item of itemMap) items.push(item);
	setInterval(sendEmbed, 100);
})();