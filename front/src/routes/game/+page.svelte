<script lang="ts">
  import { GetGameStatusColor } from '$lib/Games';

  interface Props {
    data: any;
  }

  let { data }: Props = $props();
  let admin_games = $state(data.created_games || []);
  let players = $state(data.players || []);
</script>

<section class="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
  <header class="rounded-[2rem] border border-slate-700/50 bg-slate-950/90 p-8 shadow-[0_35px_80px_-40px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/60">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div class="space-y-4">
        <p class="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Your games dashboard</p>
        <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Manage your matches</h1>
        <p class="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          View games you created, join active sessions, and keep track of who is playing.
          Select a game to continue or start a new match now.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <a href="/game/new" class="btn variant-filled inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
          <span>New Game</span>
        </a>
        <a href="/" class="btn variant-outlined inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
          Return
        </a>
      </div>
    </div>
  </header>

  {#if admin_games.length > 0}
    <section class="space-y-4">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-white">Admin Games</h2>
          <p class="text-sm text-slate-400">Games you created and can manage directly.</p>
        </div>
        <span class="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200">
          Creator
        </span>
      </div>

      <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {#each admin_games as game (game.id)}
          <li class="group overflow-hidden rounded-[1.75rem] border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-500/40">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm uppercase tracking-[0.3em] text-slate-500">{game.name}</p>
                <h3 class="mt-3 text-2xl font-semibold text-white">{game.name}</h3>
              </div>
              <span class="inline-flex h-9 items-center rounded-full bg-slate-950/90 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                {GetGameStatusColor(game) === 'green' ? 'Started' : GetGameStatusColor(game) === 'red' ? 'Finished' : 'Pending'}
              </span>
            </div>

            <p class="mt-4 text-sm leading-6 text-slate-400">{game.description ?? 'No description available.'}</p>

            <a href={`/game/${game.id}`} class="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              View game
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  {#if players.length > 0}
    <section class="space-y-4">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-white">Playing Games</h2>
          <p class="text-sm text-slate-400">Games where you're participating as a player.</p>
        </div>
        <span class="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-amber-200">
          Player
        </span>
      </div>

      <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {#each players as player}
          {#if player.games}
            <li class="group overflow-hidden rounded-[1.75rem] border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-slate-500/40">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm uppercase tracking-[0.3em] text-slate-500">{player.games.name}</p>
                  <h3 class="mt-3 text-2xl font-semibold text-white">{player.games.name}</h3>
                </div>
                <span class="inline-flex h-9 items-center rounded-full bg-slate-950/90 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                  {GetGameStatusColor(player.games) === 'green' ? 'Started' : GetGameStatusColor(player.games) === 'red' ? 'Finished' : 'Pending'}
                </span>
              </div>

              <p class="mt-4 text-sm leading-6 text-slate-400">Joined as a player in this match.</p>

              <a href={`/game/${player.games.id}`} class="mt-6 inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-300">
                Open game
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </section>
  {/if}

  {#if admin_games.length === 0 && players.length === 0}
    <div class="rounded-[1.75rem] border border-slate-700/60 bg-slate-900/80 p-10 text-center shadow-xl shadow-slate-950/20">
      <h2 class="text-3xl font-semibold text-white">No games found</h2>
      <p class="mt-3 text-sm leading-7 text-slate-400">Create a new game or ask a friend to invite you to a match.</p>
      <a href="/game/new" class="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        Create your first game
      </a>
    </div>
  {/if}
</section>

<style>
  a:hover {
    text-decoration: none;
  }
</style>