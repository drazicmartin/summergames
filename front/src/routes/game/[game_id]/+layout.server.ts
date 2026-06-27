import type { SupabaseClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

async function fetchGame(supabase: SupabaseClient, game_id: string) {
    const { data, error: fetchError } = await supabase
        .from('games')
        .select('*')
        .eq('id', game_id)
        .single();

    if (fetchError) {
        console.error('error fetching game', fetchError);
        return null;
    }

    return data;
};

async function fetchSelfPlayer(supabase: SupabaseClient, user_id: string, game_id: string) {
  const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('game_id', game_id)
        .eq('user_id', user_id)
        .single();

    if (error) {
        return null;
    }

    return data;
}

async function fetchGamePlayers(supabase: SupabaseClient, game_id: string) {
  const { data, error } = await supabase
        .from('players')
        .select('user_id, name');

  if (error) {
    console.error('error fetching game players', error);
    return [];
  }

  return data ?? [];
}

export const load = async ({ parent, params, locals: { supabase, safeGetSession } }) => {
  const session = (await safeGetSession()).session;

  if (!session || !session.user) {
    throw redirect(302, '/auth/login');
  }

  if (!params.game_id) {
    throw error(400, 'Missing game id');
  }

  const game = await fetchGame(supabase, params.game_id);
  if (!game) {
    throw error(404, 'Game not found');
  }
  
  const self_player = await fetchSelfPlayer(supabase, session.user.id, params.game_id);
  const players = await fetchGamePlayers(supabase, params.game_id);
  const is_admin = session.user.id === game.user_id;
  const kill_history = game.state?.loop?.[session.user.id]?.kill_history ?? [];

  if (!self_player && !is_admin) {
    throw redirect(308, '/game');
  }

  console.log('Game data loaded:', game );

  return {
    user: session.user,
    self_player,
    players,
    game,
    is_admin,
    kill_history,
  }
}