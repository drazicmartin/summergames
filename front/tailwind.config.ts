import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { CustomSkeletonTheme } from './custom-skeleton-theme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],

  theme: {
		extend: {
			animation: {
				// ...other animations
				first: 'moveVertical 30s ease infinite',
				second: 'moveInCircle 20s reverse infinite',
				third: 'moveInCircle 40s linear infinite',
				fourth: 'moveHorizontal 40s ease infinite',
				fifth: 'moveInCircle 20s ease infinite',
				ripple:'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
				'border-beam': "border-beam calc(var(--duration)*1s) infinite linear",
			},
			keyframes: {
				// ... other keyframes
				moveHorizontal: {
					'0%': {
						transform: 'translateX(-50%) translateY(-10%)'
					},
					'50%': {
						transform: 'translateX(50%) translateY(10%)'
					},
					'100%': {
						transform: 'translateX(-50%) translateY(-10%)'
					}
				},
				moveInCircle: {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'50%': {
						transform: 'rotate(180deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				moveVertical: {
					'0%': {
						transform: 'translateY(-50%)'
					},
					'50%': {
						transform: 'translateY(50%)'
					},
					'100%': {
						transform: 'translateY(-50%)'
					}
				},
				ripple: {
					"0%, 100%": {
						transform: "translate(-50%, -50%) scale(1)",
					},
					"50%": {
						transform: "translate(-50%, -50%) scale(0.9)",
					},
				},
				"border-beam": {
					"100%": {
						"offset-distance": "100%",
					},
				},
				"aurora-border": {
					"0%, 100%": { borderRadius: "37% 29% 27% 27% / 28% 25% 41% 37%" },
					"25%": { borderRadius: "47% 29% 39% 49% / 61% 19% 66% 26%" },
					"50%": { borderRadius: "57% 23% 47% 72% / 63% 17% 66% 33%" },
					"75%": { borderRadius: "28% 49% 29% 100% / 93% 20% 64% 25%" },
				},
				"aurora-1": {
					"0%, 100%": { top: "0", right: "0" },
					"50%": { top: "50%", right: "25%" },
					"75%": { top: "25%", right: "50%" },
				},
				"aurora-2": {
					"0%, 100%": { top: "0", left: "0" },
					"60%": { top: "75%", left: "25%" },
					"85%": { top: "50%", left: "50%" },
				},
				"aurora-3": {
					"0%, 100%": { bottom: "0", left: "0" },
					"40%": { bottom: "50%", left: "25%" },
					"65%": { bottom: "25%", left: "50%" },
				},
				"aurora-4": {
					"0%, 100%": { bottom: "0", right: "0" },
					"50%": { bottom: "25%", right: "40%" },
					"90%": { bottom: "50%", right: "25%" },
				},
			},
			colors: {
				"color-1": "hsl(var(--color-1))",
				"color-2": "hsl(var(--color-2))",
				"color-3": "hsl(var(--color-3))",
				"color-4": "hsl(var(--color-4))",
				"color-5": "hsl(var(--color-5))",
			},
		}
	},

	plugins: [
		forms,
		// skeleton({
		// 	themes: {
		// 		custom: [
		// 			CustomSkeletonTheme
		// 		]
		// 	}
		// }),
		skeleton({
			themes: { preset: [ "skeleton" ] }
		})
	],
};

export default config;
