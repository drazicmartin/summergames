import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: Date.now()
	}), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};