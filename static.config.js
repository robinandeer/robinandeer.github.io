import React, { Component } from "react";
import { reloadRoutes } from "react-static/node";
import jdown from "jdown";
import chokidar from "chokidar";
import { Renderer } from "marked";
import highlightjs from "highlight.js";

import theme from "./src/theme";

// Create your custom renderer
const renderer = new Renderer();
renderer.code = (code, language) => {
	// Check whether the given language is valid for highlight.js.
	const validLang = !!(language && highlightjs.getLanguage(language));
	// Highlight only if the language is valid.
	const highlighted = validLang
		? highlightjs.highlight(language, code).value
		: code;
	// Render the highlighted code with `hljs` class.
	return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

chokidar.watch("content").on("all", () => reloadRoutes());

const preparePost = post => {
	const year = post.date.getFullYear();
	const month = `0${post.date.getMonth() + 1}`.slice(-2);
	const date = `0${post.date.getDate()}`.slice(-2);

	return {
		...post,
		link: `/${year}/${month}/${date}/${post.slug}`,
		dateStr: post.date.toLocaleDateString()
	};
};

export default {
	plugins: ["react-static-plugin-styled-components"],
	getSiteData: () => ({
		title: "Robin Andeer"
	}),
	siteRoot: "https://www.robinandeer.com",
	getRoutes: async () => {
		const { posts, home, about } = await jdown("content", { renderer });
		// Convert dates to string repr here since they are not preserved
		const preparedPosts = posts.map(preparePost);

		const yearGroups = preparedPosts.reduce((groups, post) => {
			const yearStr = post.date.getFullYear();
			groups[yearStr] = groups[yearStr] || { year: yearStr, posts: [] };
			groups[yearStr].posts.unshift(post);
			return groups;
		}, {});
		const years = Object.values(yearGroups);
		years.sort((a, b) => parseInt(b.year) - parseInt(a.year));

		return [
			{
				path: "/",
				component: "src/containers/Home",
				getData: () => ({
					...home,
					years
				})
			},
			{
				path: "/about",
				component: "src/containers/About",
				getData: () => ({
					...about
				})
			},
			{
				path: "/blog",
				component: "src/containers/Blog",
				getData: () => ({
					posts: preparedPosts
				}),
				children: preparedPosts.map(post => ({
					path: post.link,
					component: "src/containers/Post",
					getData: () => ({
						post
					})
				}))
			},
			{
				is404: true,
				component: "src/containers/404"
			}
		];
	},
	Document: class CustomHtml extends Component {
		render() {
			const { Html, Head, Body, children } = this.props;

			return (
				<Html>
					<Head>
						<meta charSet="utf-8" />
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1.0, minimal-ui"
						/>
						<meta name="theme-color" content={theme.colors.shades[0]} />

						<title>Robin Andeer</title>
						<meta
							name="description"
							content="Developer. Gymnast. Traveller. Mad keen on technology. Constantly learning at Futurice in Stockholm."
						/>
						<meta name="keywords" content="blog, Robin Andeer, robinandeer" />
						<meta name="author" content="Robin Andeer" />
						<link rel="author" href="https://twitter.com/robinandeer" />
					</Head>
					<Body>{children}</Body>
				</Html>
			);
		}
	}
};
