<script lang="ts">
	import Ripple from "$lib/components/ui/Ripple/Ripple.svelte";
	import WordsPullUp from "$lib/components/ui/WordsPullUp/WordsPullUp.svelte";
	import Countdown from "$lib/components/Countdown.svelte";
</script>


<div
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
>
	<Ripple />
	
	<div class="absolute inset-0 flex items-center justify-center">
		<WordsPullUp
			class="text-7xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold tracking-[-0.02em] text-black dark:text-white"
			words="The Summer Games"
			delay={0.5}
		/>
	</div>

	<div class="absolute bottom-0 mb-28">
		<Countdown />
	</div>
	
	<div class="absolute bottom-0 mb-0">
		<div class="flex justify-center items-center flex-col text-center text-white font-bold">
			<div>Vendredi 28 - Dimanche 30</div>
			<span>Août 2026</span>
			<h1 class="mb-5">
				The Summer Games
			</h1>
		</div>
	</div>
</div>