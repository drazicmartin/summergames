<script lang="ts">
	import Ripple from "$lib/components/ui/Ripple/Ripple.svelte";
	import WordsPullUp from "$lib/components/ui/WordsPullUp/WordsPullUp.svelte";
	// import Countdown from "$lib/components/Countdown.svelte";
</script>


<div
	class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
>
	<Ripple />
	
		<!-- class="text-8xl text-center text-white font-bold drop-shadow-[2px_2.2px_5.2px_rgba(0,0,0,0.8)] relative flex h-[800px] w-full flex-col items-center justify-center overflow-hidden" -->
	<div class="flex items-center justify-center h-full">
		<WordsPullUp
			class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold tracking-[-0.02em] text-black dark:text-white"
			words="Summer Games"
			delay={0.4}
		/>
	</div>

	<div class="flex justify-center items-center flex-col text-center text-white font-bold">
		<div>Vendredi 28 - Dimanche 30</div>
		<span>Août 2026</span>
	</div>
	<h1 class="mb-5">
		Summer Games
	</h1>
</div>