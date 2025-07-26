<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
    interface Props {
        form: any;
    }

    let { form }: Props = $props();

    let admin_player: boolean = $state(false);
</script>

<section>
    {#if form?.error}
    <h4>
        {form.error}
    </h4>
    {/if}
    <header class="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 ">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-3xl text-slate-900">
            New Game
        </h2>
        <form method="POST" action="/auth/logout">
          <a
            href="/game"
            class="btn variant-filled"
          >
            Return
        </a>
        </form>
      </div>
    </header>
    <div class="container mx-auto max-w-lg p-8 space-y-8">
        <section>
            <form action="?/create_game" method="POST" class="flex flex-col">
                <span>Game Name</span>
                <input class="{form?.error && form?.game_name == undefined ? "input-error" : "input"}" type="text" name="game_name" value={form?.game_name ?? ""} placeholder="Game Name" />

                <div class="my-100">Game Start Time</div>
                <input class="{form?.error && form?.date == undefined ? "input-error" : "input"}" title="Input (datetime-local)" value={form?.date ?? ""} name="date" type="datetime-local" />

                <div class="my-100">I'm also a player</div>
                <input type="hidden" value={admin_player} name="admin_player">
                <SlideToggle name="slide" bind:checked={admin_player} />

                <button type="submit" class="btn variant-filled-surface my-2">Create</button>
            </form>
        </section>
    </div>
</section>
