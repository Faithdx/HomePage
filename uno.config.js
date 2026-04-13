import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			prefix: 'i-',
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
	],
	theme: {
		colors: {
			primary: '#1E1B4B',
			secondary: '#F97316',
			accent: '#F59E0B',
			light: '#FEFCE8',
			dark: '#2D3748',
		},
		fontFamily: {
			display: ['Playfair Display', 'serif'],
			sans: ['Inter', 'sans-serif'],
		},
		animation: {
			'fade-in': 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1)',
			'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
			'slide-left': 'slideLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
			'slide-right': 'slideRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
			'scale-in': 'scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			float: 'float 6s ease-in-out infinite',
			'float-delayed': 'float 6s ease-in-out 3s infinite',
			'spin-slow': 'spin 8s linear infinite',
			'bounce-slow': 'bounce 3s ease-in-out infinite',
			shimmer: 'shimmer 2s linear infinite',
			'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
		},
		keyframes: {
			fadeIn: {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			},
			slideUp: {
				'0%': { transform: 'translateY(40px)', opacity: '0' },
				'100%': { transform: 'translateY(0)', opacity: '1' },
			},
			slideLeft: {
				'0%': { transform: 'translateX(40px)', opacity: '0' },
				'100%': { transform: 'translateX(0)', opacity: '1' },
			},
			slideRight: {
				'0%': { transform: 'translateX(-40px)', opacity: '0' },
				'100%': { transform: 'translateX(0)', opacity: '1' },
			},
			scaleIn: {
				'0%': { transform: 'scale(0.9)', opacity: '0' },
				'100%': { transform: 'scale(1)', opacity: '1' },
			},
			float: {
				'0%, 100%': { transform: 'translateY(0px)' },
				'50%': { transform: 'translateY(-20px)' },
			},
			shimmer: {
				'0%': { backgroundPosition: '-200% 0' },
				'100%': { backgroundPosition: '200% 0' },
			},
			pulseDot: {
				'0%, 100%': { transform: 'scale(1)', opacity: '1' },
				'50%': { transform: 'scale(1.5)', opacity: '0.5' },
			},
		},
	},
	rules: [
		['text-shadow', { 'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.1)' }],
		['text-shadow-soft', { 'text-shadow': '0 2px 8px rgba(0, 0, 0, 0.08)' }],
		[
			'text-gradient',
			{
				'background-clip': 'text',
				'-webkit-background-clip': 'text',
				color: 'transparent',
				'background-image': 'linear-gradient(135deg, #F97316, #F59E0B)',
			},
		],
		[
			'bg-glass',
			{
				'backdrop-filter': 'blur(16px)',
				'background-color': 'rgba(255, 255, 255, 0.9)',
				'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.08)',
			},
		],
		[
			'bg-glass-dark',
			{
				'backdrop-filter': 'blur(16px)',
				'background-color': 'rgba(15, 23, 42, 0.9)',
			},
		],
		[
			'transition-transform-opacity',
			{
				transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
			},
		],
		[
			'hover-scale',
			{
				transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
			},
		],
		[
			'hover-scale:hover',
			{
				transform: 'scale(1.02)',
				'box-shadow': '0 25px 50px -12px rgba(249, 115, 22, 0.15)',
			},
		],
		[
			'hover-lift',
			{
				transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
			},
		],
		[
			'hover-lift:hover',
			{
				transform: 'translateY(-10px)',
				'box-shadow': '0 25px 50px -12px rgba(249, 115, 22, 0.18)',
			},
		],
		[
			'card-shadow',
			{
				'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.05)',
			},
		],
		[
			'card-shadow-hover',
			{
				'box-shadow': '0 10px 40px -10px rgba(249, 115, 22, 0.2)',
			},
		],
		[
			'border-gradient',
			{
				background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #F97316, #F59E0B) border-box',
				border: '2px solid transparent',
			},
		],
		[/^stagger-(\d+)$/, ([, d]) => ({ 'animation-delay': `${parseInt(d) * 0.1}s` })],
		['animate-float', { animation: 'float 6s ease-in-out infinite' }],
		['animate-float-delayed', { animation: 'float 6s ease-in-out 3s infinite' }],
		[
			'animate-shimmer',
			{
				background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
				'background-size': '200% 100%',
				animation: 'shimmer 2s linear infinite',
			},
		],
		[
			'timeline-dot-pulse',
			{
				animation: 'pulseDot 1.5s ease-in-out infinite',
				'box-shadow': '0 0 0 0 rgba(249, 115, 22, 0.7)',
			},
		],
		[
			'input-focus-ring',
			{
				transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				border: '2px solid transparent',
				'background-clip': 'padding-box',
			},
		],
		[
			'card-hover-lift',
			{
				transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
			},
		],
		[
			'card-hover-lift:hover',
			{
				transform: 'translateY(-12px) scale(1.02)',
				'box-shadow': '0 30px 60px -15px rgba(249, 115, 22, 0.25)',
			},
		],
	],
});
