import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit'

async function fetchCreatedGames(supabase: SupabaseClient, session: { user: { id: string }}) {
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('user_id', session.user.id);

    if (error) {
        console.error('error in fetchCreatedGames', error);
        return [];
    }

    return data ?? [];
};

async function fetchPlayers(supabase: SupabaseClient, user_id: string) {
  const { data, error } = await supabase.from('players').select(`
      *,
      games (*)
    `)
    .eq('user_id', user_id);

  if (error) {
      console.error('error in fetchPlayers', error);
      return [];
  }

  return data ?? [];
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals: { supabase, safeGetSession } }) {  
  const session = (await safeGetSession()).session;

  if (!session || !session.user) {
    throw redirect(302, '/auth/login');
  }
  
  const created_games = await fetchCreatedGames(supabase, session);
  const players = await fetchPlayers(supabase, session.user.id);

  return {
    user: session.user,
    created_games,
    players,
  };
}
