import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

async function fetchGame(supabase: SupabaseClient, game_id: string){
    let { data, error } = await supabase
        .from("games")
        .select()
        .eq("id", game_id)
        .single();
    if (error) {
        return error;
    } else {
        return data;
    } 
};

async function fetchSelfPlayer(supabase: SupabaseClient, user_id: string, game_id: string) {
  let { data, error } = await supabase
        .from("players")
        .select()
        .eq("game_id", game_id)
        .eq("user_id", user_id)
        .single();
    if (error) {
        return false;
    } else {
        return data;
    }
}

export const load = async ({ parent, params }) => {
  const { supabase, session } = await parent()

  let game = await fetchGame(supabase, params.game_id)
  
  let self_player = await fetchSelfPlayer(supabase, session.user.id, params.game_id);
  
  let is_admin = session.user.id == game.user_id;
  let kill_history = game.state?.loop[session.user.id]?.kill_history;

  if (!self_player && !is_admin) {
    throw redirect(308, "/game");
  }

  return {
    user: session.user,
    self_player: self_player,
    game,
    is_admin: is_admin,
    kill_history: kill_history,
  }
}