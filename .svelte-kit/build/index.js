
import root from '__GENERATED__/root.svelte';
import { respond } from '../../node_modules/@sveltejs/kit/src/runtime/server/index.js';
import { set_paths, assets, base } from '../../node_modules/@sveltejs/kit/src/runtime/paths.js';
import { set_prerendering, set_version } from '../../node_modules/@sveltejs/kit/src/runtime/env.js';
import { set_private_env } from '../../node_modules/@sveltejs/kit/src/runtime/env-private.js';
import { set_public_env } from '../../node_modules/@sveltejs/kit/src/runtime/env-public.js';

const app_template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width\" />\n\t\t<meta property=\"og:site_name\" content=\"onechart\">\n        <meta property=\"og:type\" content=\"article\">\n        <meta property=\"og:title\" content=\"Most wins in a single F1 season\">\n        <meta property=\"og:url\" content=\"http://onechart.xyz/most_f1_wins/\">\n        <meta property=\"og:description\" content=\"In 2022, Max Verstappen won 15 races, breaking the record for the most number of Grand Prix wins in a season.\">\n        <meta property=\"og:image\" content=\"http://onechart.xyz/most_f1_wins/mostWins.png\">\n\n        <meta name=\"twitter:card\" content=\"summary_large_image\">\n        <meta name=\"twitter:site\" content=\"onechart\">\n        <meta name=\"twitter:creator\" content=\"@samodrole\">\n        <meta name=\"twitter:url\" content=\"http://onechart.xyz/most_f1_wins/\">\n        <meta name=\"twitter:title\" content=\"Most wins in a single F1 season\">\n        <meta name=\"twitter:description\" content=\"In 2022, Max Verstappen won 15 races, breaking the record for the most number of Grand Prix wins in a season.\">\n        <meta name=\"twitter:image\" content=\"http://onechart.xyz/most_f1_wins/mostWins.png\">\n\t\t" + head + "\n\t</head>\n\t<!-- Google tag (gtag.js) -->\n\t\t<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-REGQF17HFH\"></script>\n\t\t<script>\n\t\twindow.dataLayer = window.dataLayer || [];\n\t\tfunction gtag(){dataLayer.push(arguments);}\n\t\tgtag('js', new Date());\n\n\t\tgtag('config', 'G-REGQF17HFH');\n\t\t</script>\n\t<body>\n\t\t<div id=\"app\">" + body + "</div>\n\t</body>\n</html>\n";

const error_template = ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid #ccc;\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n";

let read = null;

set_paths({"base":"","assets":""});
set_version("1670547611787");

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		this.options = {
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			csrf: {
				check_origin: true,
			},
			dev: false,
			handle_error: (error, event) => {
				return this.options.hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				}) ?? { message: event.route.id != null ? 'Internal Error' : 'Not Found' };
			},
			hooks: null,
			manifest,
			paths: { base, assets },
			public_env: {},
			read,
			root,
			service_worker: false,
			app_template,
			app_template_contains_nonce: false,
			error_template,
			trailing_slash: "never",
			version: "1670547611787"
		};
	}

	/**
	 * Take care: Some adapters may have to call `Server.init` per-request to set env vars,
	 * so anything that shouldn't be rerun should be wrapped in an `if` block to make sure it hasn't
	 * been done already.
	 */
	async init({ env }) {
		const entries = Object.entries(env);

		const prv = Object.fromEntries(entries.filter(([k]) => !k.startsWith('PUBLIC_')));

		const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith('PUBLIC_')));

		set_private_env(prv);
		set_public_env(pub);

		this.options.public_env = pub;

		if (!this.options.hooks) {
			const module = await import("./hooks.js");

			// TODO remove this for 1.0
			if (module.externalFetch) {
				throw new Error('externalFetch has been removed — use handleFetch instead. See https://github.com/sveltejs/kit/pull/6565 for details');
			}

			this.options.hooks = {
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				handleFetch: module.handleFetch || (({ request, fetch }) => fetch(request))
			};
		}
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		return respond(request, this.options, options);
	}
}
