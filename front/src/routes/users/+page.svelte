<script lang="ts">
  export let data: {
    players: Array<{
      user_id: string
      name: string
      email: string
      firstname: string
      lastname: string
      birthdate: string
      phone: string
      vege: boolean
      insta: boolean
      killer: boolean
      created_at: string
    }>
    error?: string
  }
</script>

<section class="mx-auto max-w-6xl p-6">
  <h1 class="text-3xl font-bold mb-4">Registered users</h1>

  {#if data.error}
    <div class="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-800">{data.error}</div>
  {/if}

  {#if data.players?.length === 0}
    <p>No registered users yet.</p>
  {:else}
    <div class="overflow-x-auto rounded-lg border">
      <table class="min-w-full text-left text-sm text-gray-800 dark:text-gray-100">
        <thead class="bg-gray-100 text-xs uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th class="px-3 py-2">Name</th>
            <th class="px-3 py-2">Firstname</th>
            <th class="px-3 py-2">Lastname</th>
            <th class="px-3 py-2">Birthdate</th>
            <th class="px-3 py-2">Phone</th>
            <th class="px-3 py-2">Vege</th>
            <th class="px-3 py-2">Insta</th>
            <th class="px-3 py-2">Killer</th>
            <th class="px-3 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {#each data.players as player}
            <tr class="border-t odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-850">
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.name || `${player.firstname} ${player.lastname}`}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.firstname}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.lastname}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.birthdate}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.phone}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.vege ? '✅' : '✖️'}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.insta ? '✅' : '✖️'}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{player.killer ? '✅' : '✖️'}</td>
              <td class="px-3 py-2 text-gray-700 dark:text-gray-200">{new Date(player.created_at).toLocaleString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>
