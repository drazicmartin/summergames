<script lang="ts">
  interface Props {
    data: any;
  }

  interface LoopEntry {
    is_dead?: boolean;
    target_name?: string;
    mission?: string;
    killed_by_id?: string;
    [key: string]: any;
  }

  interface PlayerInfo {
    user_id: string;
    name?: string;
  }

  let { data }: Props = $props();

  const game_id = data.game?.id ?? '';
  const game_title = data.game?.name ?? data.game?.game_name ?? 'Game';
  const state = data.game?.state ?? {};
  const loop = state.loop ?? {};
  const playerMap = (data.players ?? []).reduce((acc: Record<string, string>, player: PlayerInfo) => {
    if (player.user_id && player.name) {
      acc[player.user_id] = player.name;
    }
    return acc;
  }, {});

  const players = Object.entries(loop).map(([user_id, entry]) => ({
    user_id,
    ...(entry as LoopEntry),
  })) as Array<LoopEntry & { user_id: string }>;

  const alivePlayers = players.filter((player) => !player.is_dead);
  const deadPlayers = players.filter((player) => player.is_dead);
  const currentPlayer = data.user ? players.find((player) => player.user_id === data.user.id) : null;
  const isDead = currentPlayer?.is_dead ?? false;
  const currentMission = currentPlayer?.mission ?? 'No mission assigned yet.';
  const currentTarget = currentPlayer?.target_name ?? 'Unknown';
  const aliveCount = state['#alive_players'] ?? alivePlayers.length;
  const totalCount = state['#players'] ?? players.length;

  function getParticipantName(user_id: string) {
    return playerMap[user_id] ?? 'Participant';
  }

  function displayKillerLabel(killedById?: string) {
    if (!killedById) {
      return 'Unknown';
    }

    if (killedById === 'Quit Game') {
      return 'Quit Game';
    }

    return playerMap[killedById] ?? 'another participant';
  }
</script>

<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <header class="flex flex-col gap-4 rounded-[2rem] border border-slate-700/40 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Game State</p>
      <h1 class="mt-2 text-4xl font-semibold text-white">{game_title}</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Visualize the current status of the match, including who is alive and who has been eliminated.
      </p>
    </div>

    <a href={`/game/${game_id}`} class="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
      Return to game
    </a>
  </header>

  <div class="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
    <div class="space-y-6">
      <div class="rounded-[2rem] border border-slate-700/40 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Summary</p>
            <h2 class="mt-3 text-3xl font-semibold text-white">Match overview</h2>
          </div>
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="rounded-3xl bg-slate-950/80 p-4 text-center">
              <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Total players</p>
              <p class="mt-3 text-3xl font-semibold text-white">{totalCount}</p>
            </div>
            <div class="rounded-3xl bg-slate-950/80 p-4 text-center">
              <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Alive</p>
              <p class="mt-3 text-3xl font-semibold text-emerald-300">{aliveCount}</p>
            </div>
            <div class="rounded-3xl bg-slate-950/80 p-4 text-center">
              <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Eliminated</p>
              <p class="mt-3 text-3xl font-semibold text-rose-300">{deadPlayers.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-[2rem] border border-slate-700/40 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Your state</p>
            <h2 class="mt-2 text-2xl font-semibold text-white">{isDead ? 'Eliminated' : 'Still alive'}</h2>
          </div>
          <span class={`rounded-full px-3 py-1 text-xs font-semibold ${isDead ? 'bg-rose-500/20 text-rose-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
            {isDead ? 'Dead' : 'Alive'}
          </span>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-[1.5rem] bg-slate-950/70 p-5">
            <p class="text-sm uppercase tracking-[0.28em] text-slate-400">Target</p>
            <p class="mt-3 text-lg font-semibold text-white">{currentTarget}</p>
          </div>
          <div class="rounded-[1.5rem] bg-slate-950/70 p-5">
            <p class="text-sm uppercase tracking-[0.28em] text-slate-400">Mission</p>
            <p class="mt-3 text-lg font-semibold text-white">{currentMission}</p>
          </div>
        </div>

        {#if isDead}
          <div class="mt-6 rounded-[1.5rem] border border-rose-500/20 bg-rose-500/10 p-5">
            <p class="text-sm uppercase tracking-[0.28em] text-rose-200">Eliminated player guidance</p>
            <p class="mt-3 text-slate-300">
              You have been eliminated. Follow the ongoing state of the game, but do not share any details with living players.
            </p>
            <p class="mt-3 text-sm text-slate-400">Killed by: <span class="font-semibold text-white">{displayKillerLabel(currentPlayer?.killed_by_id)}</span></p>
          </div>
        {/if}
      </div>

      <div class="rounded-[2rem] border border-slate-700/40 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <h2 class="text-2xl font-semibold text-white">Player chain</h2>
        <p class="mt-2 text-sm leading-6 text-slate-400">Review the current mission assignments and targets for each participant.</p>

        <div class="mt-6 space-y-4">
          {#if alivePlayers.length > 0}
            {#each alivePlayers as player}
              <div class="rounded-[1.5rem] border border-slate-700/50 bg-slate-950/80 p-4">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm text-slate-400">Participant</p>
                    <p class="mt-1 font-semibold text-white">{getParticipantName(player.user_id)}</p>
                  </div>
                  <span class={`rounded-full px-3 py-1 text-xs font-semibold ${player.is_dead ? 'bg-rose-500/20 text-rose-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
                    {player.is_dead ? 'Dead' : 'Alive'}
                  </span>
                </div>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                  <div class="rounded-2xl bg-slate-900/80 p-4">
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-400">Target</p>
                    <p class="mt-2 text-sm font-semibold text-white">{player.target_name ?? 'Unknown'}</p>
                  </div>
                  <div class="rounded-2xl bg-slate-900/80 p-4">
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-400">Mission</p>
                    <p class="mt-2 text-sm font-semibold text-white">{player.mission ?? 'No mission'}</p>
                  </div>
                </div>
              </div>
            {/each}
          {:else}
            <p class="text-sm text-slate-400">No living participants to display.</p>
          {/if}
        </div>
      </div>
    </div>

    <aside class="space-y-6">
      <div class="rounded-[2rem] border border-slate-700/40 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <h2 class="text-2xl font-semibold text-white">Alive players</h2>
        <p class="mt-2 text-sm leading-6 text-slate-400">Players still in the game.</p>

        <div class="mt-6 space-y-3">
          {#each alivePlayers as player}
            <div class="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div class="flex items-center justify-between gap-3">
                <p class="font-semibold text-white">{getParticipantName(player.user_id)}</p>
                <span class="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-200">Alive</span>
              </div>
              <p class="mt-2 text-sm text-slate-300">Target: {player.target_name ?? 'Unknown'}</p>
            </div>
          {/each}
        </div>
      </div>

      <div class="rounded-[2rem] border border-slate-700/40 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <h2 class="text-2xl font-semibold text-white">Eliminated players</h2>
        <p class="mt-2 text-sm leading-6 text-slate-400">Players who have been removed from the loop.</p>

        <div class="mt-6 space-y-3">
          {#if deadPlayers.length > 0}
            {#each deadPlayers as player}
              <div class="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4">
                <div class="flex items-center justify-between gap-3">
                  <p class="font-semibold text-white">{getParticipantName(player.user_id)}</p>
                  <span class="rounded-full bg-rose-500/10 px-2 py-1 text-xs text-rose-200">Dead</span>
                </div>
                <p class="mt-2 text-sm text-slate-300">Killed by: {displayKillerLabel(player.killed_by_id)}</p>
              </div>
            {/each}
          {:else}
            <p class="text-sm text-slate-400">No eliminations have occurred yet.</p>
          {/if}
        </div>
      </div>
    </aside>
  </div>
</section>
