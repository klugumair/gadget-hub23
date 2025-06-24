
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FFD700',
					foreground: '#000000'
				},
				secondary: {
					DEFAULT: '#1A1A1A',
					foreground: '#FFD700'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#2A2A2A',
					foreground: '#B8860B'
				},
				accent: {
					DEFAULT: '#FFD700',
					foreground: '#000000'
				},
				popover: {
					DEFAULT: '#1A1A1A',
					foreground: '#FFD700'
				},
				card: {
					DEFAULT: '#1A1A1A',
					foreground: '#FFD700'
				},
				gold: {
					50: '#FFFDF7',
					100: '#FFF9E6',
					200: '#FFF2CC',
					300: '#FFE699',
					400: '#FFD700',
					500: '#E6C200',
					600: '#B8A000',
					700: '#8A7700',
					800: '#5C4F00',
					900: '#2E2700'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite'
			},
			backgroundImage: {
				'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
				'gradient-dark': 'linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #2A2A2A 100%)',
				'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
