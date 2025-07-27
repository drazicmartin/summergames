<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        mission?: string;
        target_name?: string;
        title?: string;
        kill_form?: import('svelte').Snippet;
    }

    let {
        mission = "MISSION DESCRIPTION",
        target_name = "TARGET NAME",
        title = "MAIN TITLE",
        kill_form
    }: Props = $props();

    function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

    let display = $state(false);
    onMount(() => {
        display = true;
    })

</script>

<div class="text-center grow hover:border-blue-500 hover:border-solid hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-slate-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8">
    <div class="flex flex-col">
        <div class="text-center text-cyan-800 text-3xl">{title}</div>
        <div class="text-center text-lg">You have to <span class="text-red-500">kill</span> 
            {#if display}
                <span transition:typewriter|local={{speed:0.2}} class="font-bold">{target_name}</span>
            {/if}
        </div>
        <div class="text-center grow hover:border-red-900 hover:border-solid hover:bg-red-500 hover:text-black group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-red-300 text-sm leading-6 text-red-900 font-medium py-3 px-8">
            Mission : 
            {#if display}
            <p transition:typewriter|local={{speed: 3}}>
                {mission}
            </p>
            {/if}
        </div>
        {#if target_name != "TARGET NAME" }
            {@render kill_form?.()}
        {/if} 
    </div>
</div>