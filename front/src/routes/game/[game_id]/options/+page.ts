async function fetchAllPlayers(supabase, game_id){
    let { data, error } = await supabase
            .from("players")
            .select()
            .eq("game_id", game_id);
    return data;
}

export const load = async ({ parent, params }) => {
    const { supabase, session } = await parent()
    if (!session) {
        return {};
    }

    let game_id = params.game_id;

    return {
        all_players: await fetchAllPlayers(supabase, game_id),
    }
}