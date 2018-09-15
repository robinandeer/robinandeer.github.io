import { css } from "styled-components";

export default {
	colors: {
		background: "#1d1d1d",
		headings: "#eaeaea",
		text: "#afafaf",
		shades: ["#000000", "#131313", "#1d1d1d", "#242424", "#2a2a2a"],
		green: "#2e7d32",
		blue: "#1565c0",
		purple: "#6a1b9a",
		red: "#c62828",
		pink: "#ad1457"
	},
	spacing: {
		smallest: "4px",
		smaller: "8px",
		small: "12px",
		medium: "16px",
		large: "20px",
		larger: "24px",
		largest: "32px",
		huge: "72px"
	},
	font: {
		size: {
			smaller: "12px",
			small: "14px",
			medium: "16px",
			large: "20px",
			larger: "24px",
			largest: "32px"
		},
		color: {
			default: "#8a8a8a",
			highlight: "#cecece"
		}
	}
};

const sizes = {
	giant: 1170,
	desktop: 992,
	tablet: 768,
	phone: 376
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
	// use em in breakpoints to work properly cross-browser and support users
	// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
	const emSize = sizes[label] / 16;
	accumulator[label] = (...args) => css`
		@media (min-width: ${emSize}em) {
			${css(...args)};
		}
	`;
	return accumulator;
}, {});
