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
        return data;
    }
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals: { supabase, safeGetSession } }) {  
  let session = (await safeGetSession()).session;

  if (!session) {
    throw redirect(302, '/auth/login');
  }
  
  // Fetch data if the user is authenticated
  const created_games = await fetchCreatedGames(supabase, session);
  const players = await fetchPlayers(supabase, session.user.id);

  return {
    user: session.user,
    created_games,
    players,
  };
}
