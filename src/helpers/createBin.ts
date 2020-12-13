import fetch from "node-fetch";
import { encode } from "querystring";

import { checkStatus } from "./checkStatus";

const TOKEN_REGEXP = /[a-zA-Z0-9]{24}\.[a-zA-Z0-9]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g;

export async function createBin(code: string, language = "txt"): Promise<string | Error> {
	const body = encode({
		code: code.replace(TOKEN_REGEXP, "[DISCORD TOKEN DETECTED]"),
		lang: language,
	});

	const binUrl = process.env.BIN_URL!;
	return fetch(binUrl, {
		method: "POST",
		body,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
	})
		.then(checkStatus)
		.then((res) => res.url)
		.catch((err: Error) => err);
}