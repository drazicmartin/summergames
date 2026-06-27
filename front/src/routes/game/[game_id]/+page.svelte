<script lang="ts">
    import { preventDefault } from 'svelte/legacy';

    import Mission from "$lib/Mission.svelte";
    import { tick } from 'svelte';

    interface Props {
        data: any;
        form: any;
    }

    let { data, form }: Props = $props();

    let kill_form: HTMLFormElement | undefined = $state();

    let game_name = $derived(data.game?.game_name ?? '');
    let game_id = $derived(data.game?.id ?? '');
    let score = $derived(data.self_player?.score ?? 0);
    let kill_history = $derived(data.kill_history ?? []);

    let mission_1 = $derived(data.game?.state?.loop?.[data.user?.id] ?? null);

    $inspect(data.user?.id, "data.user?.id");

    let password_value: string = $state('');

    async function handleFormKill() {
        const response = prompt('Enter the killed player password (default is "password"):');
        if (response === null || response === '') {
            return;
        }
        password_value = response;
        await tick();
        kill_form?.submit();
    }
</script>

<section>
    <header class="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 ">
      <div class="flex items-center gap-4">
        <h2 class="font-semibold text-3xl text-slate-200">
            Game : {data.game.name}
        </h2>
        <a class="btn variant-outlined rounded-full px-3 py-2 text-sm" href={`/game/${game_id}/options`}>
            Options
        </a>
        <a
            href="/game"
            class="btn variant-filled"
        >
            Return
        </a>
      </div>
    </header>
    {#if form}
        <div class="bg-{form?.success ? "green" : "red"}-100 border border-{form?.success ? "green" : "red"}-400 text-{form?.success ? "green" : "red"}-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">{form?.success ? "Success" : "Error"}</strong>
            <span class="block sm:inline">{form.message}</span>
        </div>
    {/if}

    <h2 class="grow hover:border-green-700 hover:border-solid hover:bg-slate-800 text-green-700 group w-full flex items-center justify-center rounded-md border-2 border-double border-slate-300 text-sm leading-6 font-medium py-3 bg-slate-800">
        Your score : {score}
    </h2>

    {#if data.self_player?.is_dead}
        <ul class="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 text-sm leading-6">
            <div class="flex flex-col justify-center items-center">
                <div class="flex items-center">
                    <span class="flex w-10 text-red-500 text-2xl justify-center">💀</span>
                    <div class="text-red-500 text-2xl">
                        You are dead ! 
                    </div>
                    <span class="flex w-10 text-red-500 text-2xl justify-center">💀</span>
                </div>
                <div class="text-center mt-2 text-base">
                    Follow the game state, but tell and show no one what you know !
                    <a href={`/game/${game_id}/state`} class="btn variant-filled mt-3 bg-blue-600 max-w-xl w-full">Game state</a>
                </div>
            </div>
        </ul>
    {:else if data.game.is_started}
        <ul class="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 text-sm leading-6">
            <Mission
                title="Your Target"
                mission={mission_1?.mission}
                target_name={mission_1?.target_name}
            />

            {#if mission_1}
                <form bind:this={kill_form} action="?/kill_player" method="POST" onsubmit={preventDefault(handleFormKill)} class="mt-4 flex flex-col items-center justify-center gap-3">
                    <input type="hidden" name="killed_player_password" bind:value={password_value}>
                    <input type="hidden" name="killed_player_id" value={mission_1.target_id}>
                    <button type="submit" class="btn variant-filled mt-3 bg-red-600 max-w-xl w-full">I killed !</button>
                </form>
            {:else}
                <div class="text-center text-slate-300">No mission assigned yet.</div>
            {/if}
        </ul>
    {:else if (!data.game.is_started)}
        <div class="text-6xl text-center text-red-400 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            Game did not started yet
        </div>
        <div class="text-3xl text-center text-red-400 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            (Game master will start the game soon.)
        </div>
    {/if}
    {#if kill_history}
        
        <h2 class="text-lg text-center">
            Your kill feed : 
        </h2>
        <ul class="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6     gap-4 text-sm leading-6">
            {#each kill_history || [] as name}
                <li class="text-center grow hover:border-black hover:border-solid hover:bg-red-900 hover:text-red-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-slate-300 text-sm leading-6 text-red-600 font-medium py-3 px-8">
                    {name}
                </li>
            {/each}
        </ul>
    {/if}
</section>