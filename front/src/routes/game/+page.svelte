<script lang="ts">
  import { run } from 'svelte/legacy';

  import { GetGameStatusColor } from '$lib/Games.ts';

  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  let admin_games = $state([]);
  let players = $state([]);
  run(() => {
    (admin_games = data.created_games);
  });
  run(() => {
    (players = data.players);
  });
</script>

<section class="divide-y">
  <header class="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 ">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-3xl text-slate-100">Games</h2>
      <a href="/game/new" class="btn variant-filled">
        <svg width="20" height="20" fill="currentColor" class="mr-2" aria-hidden="true">
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
        New
      </a>
      <a
            href="/"
            class="btn variant-filled"
        >
            Return
        </a>
    </div>
  </header>
  {#if (admin_games.length != 0)}
    <div>
      <h2 class="text-center bg-orange-900">Admin Games</h2>
      <ul class="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
        {#each admin_games as game (game.id)}
          <li>
            <a href="game/{game.id}" class="grow hover:border-blue-500 hover:border-solid hover:bg-slate-800 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3 px-8">
              <div class="content">
                <div class="content1">
                  {game.name}
                </div>
                <div class="content2">
                  <span class="dot" style:background-color={GetGameStatusColor(game)}></span>
                </div>
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  {#if (players.length != 0)}
  <div>
    <h2 class="text-center bg-orange-900">Playing Games</h2>
    <ul class="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 text-sm leading-6">
      {#each players as player}
        <li>
          <a href="game/{player.games.id}" class="grow hover:border-blue-500 hover:border-solid hover:bg-slate-800 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-double border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3 px-8">
            <div class="content">
              <div class="content1">
                {player.games.name}
              </div>
              <div class="content2">
                <span class="dot" style:background-color={GetGameStatusColor(player.game)}></span>
              </div>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
  {/if}
</section>
  
<style>
  .dot {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }

  .content {
    display: flex;
    width: inherit;
  }

  .content1 {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }

  .content2 {
    flex-grow: 0;
    display: flex;
    justify-content: center;
  }
</style>