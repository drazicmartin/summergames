<script lang="ts">
    import { onMount } from 'svelte';

    interface Props {
        mission?: string;
        target_name?: string;
        title?: string;
        kill_form?: import('svelte').Snippet;
    }

    let {
        mission = 'MISSION DESCRIPTION',
        target_name = 'TARGET NAME',
        title = 'MAIN TITLE',
        kill_form
    }: Props = $props();

    function typewriter(node, { speed = 1 }) {
        const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

        if (!valid) {
            throw new Error('This transition only works on elements with a single text node child');
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
    });
</script>

<section class="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-[2rem] border border-slate-700/20 bg-slate-950/90 p-6 shadow-[0_35px_120px_-45px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/50">
    <header class="space-y-3 text-center">
        <p class="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Classified briefing</p>
        <h1 class="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">{title}</h1>
        <p class="mx-auto max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Your objective is clear: complete the mission by eliminating the target and returning safely.
        </p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <article class="rounded-[1.75rem] border border-cyan-500/20 bg-slate-900/90 p-6 shadow-xl shadow-cyan-500/5">
            <div class="mb-4 flex items-center justify-between rounded-3xl bg-slate-950/80 p-4 text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                <span>Primary objective</span>
                <span class="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">High Priority</span>
            </div>

            <div class="space-y-4">
                <p class="text-2xl font-semibold leading-tight text-slate-100">
                    You have to <span class="text-rose-400">kill</span>
                </p>

                <div class="flex justify-center">
                    <span class="inline-flex rounded-full bg-slate-950/80 px-6 py-4 text-xl font-semibold text-rose-200 ring-1 ring-rose-400/20 shadow-sm shadow-rose-500/10">
                        {#if display}
                            <span transition:typewriter|local={{ speed: 0.22 }}>{target_name}</span>
                        {/if}
                    </span>
                </div>

                <div class="rounded-[1.5rem] border border-rose-500/20 bg-rose-500/5 p-5 text-slate-200">
                    <div class="mb-3 text-xs uppercase tracking-[0.32em] text-rose-200/75">Mission details</div>
                    <p class="leading-7 text-slate-200/90">
                        {#if display}
                            <span transition:typewriter|local={{ speed: 3 }}>{mission}</span>
                        {/if}
                    </p>
                </div>
            </div>
        </article>

        <aside class="space-y-6 rounded-[1.75rem] border border-slate-700/30 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/10">
            <div class="space-y-3 rounded-[1.5rem] bg-slate-900/80 p-5">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-400">Target</p>
                <h2 class="text-3xl font-semibold text-cyan-100">{target_name}</h2>
            </div>

            {#if target_name != 'TARGET NAME'}
                <div class="rounded-[1.5rem] border border-slate-700/30 bg-slate-900/80 p-5">
                    {@render kill_form?.()}
                </div>
            {/if}
        </aside>
    </div>
</section>
