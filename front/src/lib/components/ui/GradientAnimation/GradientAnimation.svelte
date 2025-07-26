<script lang="ts">
	import { run } from 'svelte/legacy';

	import { cn } from '$lib/utils/cn';
	import { onMount } from 'svelte';

	interface Props {
		gradientBackgroundStart?: string | null;
		gradientBackgroundEnd?: string | null;
		firstColor?: string | null;
		secondColor?: string | null;
		thirdColor?: string | null;
		fourthColor?: string | null;
		fifthColor?: string | null;
		pointerColor?: string | null;
		size?: string | null;
		blendingValue?: string | null;
		className?: string | undefined;
		containerClassName?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let {
		gradientBackgroundStart = 'rgb(108, 0, 162)',
		gradientBackgroundEnd = 'rgb(0, 17, 82)',
		firstColor = '18, 113, 255',
		secondColor = '221, 74, 255',
		thirdColor = '100, 220, 255',
		fourthColor = '200, 50, 50',
		fifthColor = '180, 180, 50',
		pointerColor = '140, 100, 255',
		size = '80%',
		blendingValue = 'hard-light',
		className = undefined,
		containerClassName = undefined,
		children
	}: Props = $props();

	let interactiveRef: HTMLDivElement;

	let curX = 0;
	let curY = 0;
	let tgX = 0;
	let tgY = 0;


	onMount(() => {
		document.body.style.setProperty('--gradient-background-start', gradientBackgroundStart);
		document.body.style.setProperty('--gradient-background-end', gradientBackgroundEnd);
		document.body.style.setProperty('--first-color', firstColor);
		document.body.style.setProperty('--second-color', secondColor);
		document.body.style.setProperty('--third-color', thirdColor);
		document.body.style.setProperty('--fourth-color', fourthColor);
		document.body.style.setProperty('--fifth-color', fifthColor);
		document.body.style.setProperty('--pointer-color', pointerColor);
		document.body.style.setProperty('--size', size);
		document.body.style.setProperty('--blending-value', blendingValue);
	});

	function updateGradient() {
		if (!interactiveRef) {
			return;
		}
		curX = curX + (tgX - curX) / 20;
		curY = curY + (tgY - curY) / 20;
		interactiveRef.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
	}
	run(() => {
		tgX || tgY, updateGradient();
	});
</script>

<div
	class={cn(
		'relative left-0 top-0 h-full w-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
		containerClassName
	)}
>
	<svg class="hidden">
		<defs>
			<filter id="blurMe">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
					result="goo"
				/>
				<feBlend in="SourceGraphic" in2="goo" />
			</filter>
		</defs>
	</svg>
	<div class={cn('', className)}>{@render children?.()}</div>
	<div class="gradients-container h-full w-full [filter:url(#blurMe)_blur(40px)]">
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:center_center]`,
				`animate-first`,
				`opacity-100`
			)}
		></div>
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:calc(50%-400px)]`,
				`animate-second`,
				`opacity-100`
			)}
		></div>
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:calc(50%+400px)]`,
				`animate-third`,
				`opacity-100`
			)}
		></div>
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:calc(50%-200px)]`,
				`animate-fourth`,
				`opacity-70`
			)}
		></div>
		<div
			class={cn(
				`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
				`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
				`[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
				`animate-fifth`,
				`opacity-100`
			)}
		></div>
	</div>
</div>