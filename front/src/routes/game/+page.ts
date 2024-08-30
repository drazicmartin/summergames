// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit'

async function fetchCreatedGames(supabase, session){
    let { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("user_id", session.user.id);
    if (error) {
        return error;
    } else {
        return data;
    }
};

async function  fetchPlayers(supabase, user_id){
  const { data, error } = await supabase.from('players').select(`
      *,
      games (*)
    `)
    .eq("user_id", user_id);
    if (error) {
        return error;
    } else {
        return data;
    }
}

export const load = async ({ parent }) => {
  const { supabase, session } = await parent()

  console.log(session);
  
  if (!session) {
    throw redirect(302, '/auth/login');
  }

  return {
    user: session.user,
    created_games: await fetchCreatedGames(supabase, session),
    players: await fetchPlayers(supabase, session.user.id),
  }
}
