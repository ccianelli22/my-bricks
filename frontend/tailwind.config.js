module.exports = {
	purge: ["./src/frontend/*.{ts,tsx}", "./src/frontend/public/index.html"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				dracula: {
					background: "#282a36",
					selection: "#44475a",
					foreground: "#f8f8f2",
					comment: "#6272a4",
					cyan: "#8be9fd",
					green: "#50fa7b",
					orange: "#ffb86c",
					pink: "#ff79c6",
					purple: "#bd93f9",
					red: "#ff5555",
					yellow: "#f1fa8c",
				},
			},
		},
	},
	variants: {
		extend: {
			fontWeight: ["hover", "focus"],
			opacity: ["disabled"],
			backgroundColor: ["checked"],
			borderColor: ["checked"],
			inset: ["checked"],
			zIndex: ["hover", "active"],
		},
	},
	plugins: [],
}
