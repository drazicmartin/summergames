<!-- src/routes/+page.svelte -->
<script lang="ts">
	import GradientAnimation from "$lib/components/ui/GradientAnimation/GradientAnimation.svelte";
	// import Countdown from "$lib/components/Countdown.svelte";

	let colors = ["#FC7850", "#FCB6A0", '#e879f9', '#22d3ee'];
	let visible: boolean = true;
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
			<div class="grid">
				<aside class="alert variant-ghost">
					<div class="alert-message">
						<h5 class="text-xl">Vendredi 30 Août</h5>
						<span>61 impasse des croix Bigeolles</span>
					</div>
				</aside>
			</div>
	  	</div>
	</div>
</GradientAnimation>