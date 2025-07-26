<script lang="ts">
    import { run, preventDefault } from 'svelte/legacy';

    import { getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import MdSecurity from 'svelte-icons/md/MdSecurity.svelte'
    import MdInfoOutline from 'svelte-icons/md/MdInfoOutline.svelte'
    import MdLockOutline from 'svelte-icons/md/MdLockOutline.svelte'
    import MdAccountCircle from 'svelte-icons/md/MdAccountCircle.svelte'
    import MdDeleteForever from 'svelte-icons/md/MdDeleteForever.svelte'
    import { enhance } from '$app/forms';
    import { onMount, tick } from 'svelte';
			
    const modalStore = getModalStore(); 

    interface Props {
        data: any;
        form: any;
    }

    let { data, form }: Props = $props();
    let delete_game_form = $derived({
        type: 'confirm',
        // Data
        title: `Confirm delete ${game_name} Game`,
        body: 'Are you sure you wish to proceed?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => r ? delete_game_form.submit() : null,
    });
    let change_password_game_form;
    let change_name_form = $derived({
        type: 'confirm',
        // Data
        title: `Confirm Change name for ${game_name} Game`,
        body: 'Are you sure you wish to proceed?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => r ? change_name_form.submit() : null,
    });
    let delete_user_form = $state();
    let reset_game_form = $derived({
        type: 'confirm',
        // Data
        title: `Confirm Reset Game State ?`,
        body: 'Are you sure you wish to proceed?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => r ? reset_game_form.submit() : null,
    });
    let quit_game_form = $derived({
        type: 'confirm',
        // Data
        title: `Confirm Shuffle Game State ?`,
        body: 'Are you sure you wish to proceed?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => r ? quit_game_form.submit() : null,
    });
    let shuffle_game_form = $derived({
        type: 'confirm',
        // Data
        title: `Confirm Shuffle Game State ?`,
        body: 'Are you sure you wish to proceed?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => r ? shuffle_game_form.submit() : null,
    });

    let delete_user_name = $state();
    
    let all_players = data.all_players;
    let game_name = $state();
    run(() => {
        game_name = data.game.name;
    });
    let game_id = $derived(data.game.id);
    let game = $derived(data.game);

    let cmps = $state([]);
    
    let modal_delete_game: ModalSettings = $derived();
    

    function handleSubmitDeleteGame(){
        modalStore.trigger(modal_delete_game);
    }

    let modal_change_password: ModalSettings = $derived({
        type: 'confirm',
        // Data
        title: `Confirm Change password for ${game_name} Game`,
        body: 'Are you sure you wish to proceed?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => r ? change_password_game_form.submit() : null,
    });
    

    function handleSubmitChangePassword(){
        modalStore.trigger(modal_change_password);
    }

    let modal_change_name: ModalSettings = $derived();
    

    function handleSubmitChangeName(){
        modalStore.trigger(modal_change_name);
    }

    let modal_delete_user: ModalSettings = $derived({
        type: 'confirm',
        // Data
        title: `Confirm Remove ${delete_user_name} from the game ?`,
        body: 'Are you sure you wish to proceed?',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => r ? delete_user_form.submit() : null,
    }); 
    
    
    
    async function handleSubmitDeleteUser(player_name: string, index: number){
        delete_user_name = player_name;
        delete_user_form = cmps[index];
        await tick();
        modalStore.trigger(modal_delete_user);
    }


    let modal_reset_game_state: ModalSettings = $derived(); 
    
    
    function handleSubmitResetGameState(){
        modalStore.trigger(modal_reset_game_state);
    }

    let modal_shuffle_game_state: ModalSettings = $derived(); 
    
    
    function handleSubmitShuffleGameState(){
        modalStore.trigger(modal_shuffle_game_state);
    }

    let modal_quit_game: ModalSettings = $derived(); 
    
    
    function handleSubmitQuitGame(){
        modalStore.trigger(modal_quit_game);
    }
</script>

<section>
    <header class="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 ">
      <div class="flex items-center">
        <h2 class="font-semibold text-3xl text-slate-300">
            Options
        </h2>
        <a  
        href="/game/{game_id}"
        class="btn variant-filled mx-10">
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
    <Accordion>
        <AccordionItem>
            {#snippet lead()}
                        <div class="h-5"><MdInfoOutline /></div>
                    {/snippet}
            {#snippet summary()}
                        Info
                    {/snippet}
            {#snippet content()}
                    
                    <div class="flex justify-center mx-2">
                        <h2 class="grow max-w-2xl hover:border-blue-500 hover:border-solid hover:bg-slate-700 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-slate-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500">
                            Game : {game_name}
                        </h2>
                    </div>
                
                    {/snippet}
        </AccordionItem>
        {#if data?.is_admin}
            <AccordionItem open>
                {#snippet lead()}
                                <div class="h-5"><MdSecurity /></div>
                            {/snippet}
                {#snippet summary()}
                                Admin
                            {/snippet}
                {#snippet content()}
                            
                        <div>
                            <div class="flex flex-row justify-center mx-2 items-center">
                                <form method="POST" action="?/start_game" class="grow items-center justify-center mx-1">
                                    <button
                                        type="submit"
                                        disabled={game.is_started}
                                        class="btn mt-2 grow max-w-2xl hover:border-green-500 hover:border-solid hover:bg-slate-700 hover:text-green-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-green-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                                    >
                                        Start Game
                                    </button>
                                </form>
                                <form method="POST" action="?/stop_game" class="grow items-center justify-center mx-1">
                                    <button
                                        type="submit"
                                        disabled={game.is_finish}
                                        class="btn mt-2 grow max-w-2xl hover:border-red-500 hover:border-solid hover:bg-slate-700 hover:text-red-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-red-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                                    >
                                        Stop Game
                                    </button>
                                </form>
                            </div>
                            <form bind:this={shuffle_game_form} onsubmit={preventDefault(handleSubmitShuffleGameState)} method="POST" action="?/shuffle_game_state" class="flex flex-col items-center justify-center mx-2">
                                <button
                                    type="submit"
                                    class="btn mt-2 grow max-w-2xl hover:border-red-500 hover:border-solid hover:bg-slate-700 hover:text-red-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-red-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                                >
                                    Shuffle Game state
                                </button>
                            </form>
                            <hr class="h-2 mx-5 my-4 bg-gray-500 rounded md:my-10">
                            <div class="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 mt-4 items-center gap-2">
                                {#each all_players as player, index}
                                    <form bind:this={cmps[index]} method="POST" action="?/delete_user" onsubmit={preventDefault(() => handleSubmitDeleteUser(player.name, index))}>
                                        <button class="hover:border-blue-500 hover:border-solid hover:bg-slate-700 hover:text-blue-500 group w-full flex justify-center rounded-md border-2 border-double border-slate-300 text-xl leading-6 text-slate-900 font-medium py-3 bg-slate-500 items-center">
                                            <div class="text-lg w-full text-left ml-2">
                                                {player.name} <span class="ml-2 text-xs">{player.email}</span>
                                            </div>
                                            <input type="hidden" name="user_id" value={player.user_id}>
                                            <div class="w-7 text-left text-red-600 mr-2"><MdDeleteForever /></div>
                                        </button>
                                    </form>
                                {/each}
                            </div>
                            <form method="POST" action="?/add_player" class="flex flex-col items-center justify-center mx-2 mt-5">
                                <input required name="player_email" class="input grow max-w-2xl mt-2 text-center" title="Input (email)" type="email" placeholder="john@example.com" autocomplete="email" />
                                <button
                                type="submit"
                                class="btn mt-2 grow max-w-2xl hover:border-blue-500 hover:border-solid hover:bg-slate-700 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-blue-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                                >
                                Add user
                            </button>
                        </form>
                        <form method="POST" action="?/add_summer_games_player" class="flex flex-col items-center justify-center mx-2 mt-5">
                            <button
                            type="submit"
                            class="btn mt-2 grow max-w-2xl hover:border-blue-500 hover:border-solid hover:bg-slate-700 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-blue-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                            >
                            Add Summer Games Players
                        </button>
                    </form>
                    <hr class="h-2 mx-5 my-4 bg-gray-500 rounded md:my-10">
                    <form bind:this={reset_game_form} onsubmit={preventDefault(() => handleSubmitResetGameState())} method="POST" action="?/reset_game_state" class="flex flex-col items-center justify-center mx-2 my-2">
                        <button
                            type="submit"
                            class="btn mt-2 grow max-w-2xl hover:border-red-500 hover:border-solid hover:bg-slate-700 hover:text-red-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-red-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                        >
                            Reset Game
                        </button>
                    </form>
                    <form bind:this={delete_game_form} method="POST" action="?/delete_game" onsubmit={preventDefault(handleSubmitDeleteGame)} class="flex justify-center mx-2 my-2">
                                <button
                                    type="submit"
                                    class="btn grow max-w-2xl hover:border-red-500 hover:border-solid hover:bg-slate-700 hover:text-red-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-red-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                                >
                                    Delete Game
                                </button>
                            </form>
                        </div>
                    
                            {/snippet}
            </AccordionItem>
        {/if}

        <AccordionItem open={form?.open == "password"}>
            {#snippet lead()}
                        <div class="h-5"><MdLockOutline /></div>
                    {/snippet}
            {#snippet summary()}
                        Player Password
                    {/snippet}
            {#snippet content()}
                    
                    <form bind:this={quit_game_form} method="POST" action="?/change_password" onsubmit={preventDefault(handleSubmitQuitGame)} class="flex flex-col items-center justify-center mx-2">
                        <input type="password" name="current_password" required class="input grow max-w-2xl mt-2 text-center" placeholder="current password : (default='password') " >
                        <input type="password" name="new_password" required class="input grow max-w-2xl mt-2 text-center" placeholder="new password">
                        <button
                            type="submit"
                            class="btn grow max-w-2xl mt-2 hover:border-blue-500 hover:border-solid hover:bg-slate-700 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-blue-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                        >
                            Change password
                        </button>
                    </form>
                
                    {/snippet}
        </AccordionItem>

        <AccordionItem open={form?.open == "name"}>
            {#snippet lead()}
                        <div class="h-5"><MdAccountCircle /></div>
                    {/snippet}
            {#snippet summary()}
                        Player Name
                    {/snippet}
            {#snippet content()}
                    
                    <div class="flex justify-center">
                        <h2 class="grow max-w-2xl hover:border-blue-500 hover:border-solid hover:bg-slate-700 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-slate-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500">
                            Current Name : {data.self_player.name}
                        </h2>
                    </div>
                    <form bind:this={change_name_form} method="POST" action="?/change_name" onsubmit={preventDefault(handleSubmitChangeName)} class="flex flex-col items-center justify-center mx-2">
                        <input type="text" name="name" required class="input grow max-w-2xl mt-2 text-center" placeholder="Name" >
                        <button
                            type="submit"
                            class="btn grow max-w-2xl mt-2 hover:border-blue-500 hover:border-solid hover:bg-slate-700 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-blue-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                        >
                            Change name
                        </button>
                    </form>
                
                    {/snippet}
        </AccordionItem>

        <AccordionItem >
            {#snippet lead()}
                        <div class="h-5"><MdAccountCircle /></div>
                    {/snippet}
            {#snippet summary()}
                        Quit Game
                    {/snippet}
            {#snippet content()}
                    
                    <form bind:this={quit_game_form} method="POST" action="?/quit_game" onsubmit={preventDefault(handleSubmitQuitGame)} class="flex flex-col items-center justify-center mx-2">
                        <button
                            type="submit"
                            class="btn grow max-w-2xl mt-2 hover:border-red-500 hover:border-solid hover:bg-slate-700 hover:text-red-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-red-300 text-xl leading-6 text-slate-900 font-medium py-3 px-8 bg-slate-500"
                        >
                            Quit
                        </button>
                    </form>
                
                    {/snippet}
        </AccordionItem>
    </Accordion>
</section>