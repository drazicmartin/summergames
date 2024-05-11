<!-- src/routes/+page.svelte -->
<script lang="ts">
	import GradientAnimation from "$lib/components/ui/GradientAnimation/GradientAnimation.svelte";
	import Countdown from "$lib/components/Countdown.svelte";

	let colors = ["#FC7850", "#FCB6A0", '#e879f9', '#22d3ee'];
</script>

<GradientAnimation>
	<div
		class="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl"
	>
		<div class="flex flex-col h-full w-full justify-around">
			<div class="grid mt-32">
				<h1
					class="text-7xl text-white drop-shadow-[2px_2.2px_5.2px_rgba(0,0,0,0.8)]"
				>
					Summer Games
				</h1>
			</div> 
			<div class="grid justify-center">
				<Countdown/>
			</div>
			<div class="grid">
				<div role="alert" class="alert text-3xl">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					<span>Vendredi 30 Août</span>
					<span>61 impasse des croix Bigeolles</span>
					<span></span>
				</div>
			</div>
	  	</div>
	</div>
</GradientAnimation>