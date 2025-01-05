import OpenAI from 'openai';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
	OPEN_AI_KEY: string;
	AI: Ai;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	'/*',
	cors({
		origin: '*',
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
		allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT'],
		exposeHeaders: ['Content-length', 'X-kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
)

app.post('/translateDocument', async (c) => {
	const { documentData, targetLang } = await c.req.json();

	//generate summary
	const summaryResponse = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
		input_text: documentData,
		max_length: 1000,
	});

	//translate summary 
	const response = await c.env.AI.run('@cf/meta/m2m100-1.2b', {
		text: summaryResponse.summary,
		source_lang: 'english',
        target_lang: targetLang,
	})

	return new Response(JSON.stringify(response))
})

export default app;