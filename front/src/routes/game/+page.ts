// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit'

async function fetchCreatedGames(supabase, session){
    let { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("user_id", session.user.id);
    if (error) {
        console.log("error in fetchCreatedGames")
        console.log(error);
        return error;
    } else {
        console.log(data)
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
        console.log("error in fetchPlayers")
        console.log(error);
        return error;
    } else {
        console.log(data)
        return data;
    }
}

export const load = async ({ parent }) => {
  const { supabase, session } = await parent()

  console.log("in load of game")
  
  if (!session) {
    throw redirect(302, '/auth/login');
  }

  console.log(session)

  return {
    user: session.user,
    created_games: await fetchCreatedGames(supabase, session),
    players: await fetchPlayers(supabase, session.user.id),
  }
}
