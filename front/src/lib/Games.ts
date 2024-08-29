import type { SupabaseClient } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";
import { user } from "./UserStore";

export function GetGameStatusColor(game) {
    if (game?.is_finish) return "red"
    else if (game?.is_started) return "green"
    return "orange"
}

function shuffle(array) {
    let array_copy = [...array];
    let currentIndex = array_copy.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array_copy[currentIndex], array_copy[randomIndex]] = [
        array_copy[randomIndex], array_copy[currentIndex]];
    }
  
    return array_copy;
  }

export async function ShuffleGameState(supabase: SupabaseClient, game_id: number){
        const { data: game, error: e_g } = await supabase
        .from("games")
        .select("*")
        .eq("id", game_id)
        .single();

    if (game.is_started || game.is_finish){
        return fail(405, {message: "game has not staretd yet or is already finsish"});
    }

    const { data: alive_players, error: e_p } = await supabase
                        .from("players")
                        .select()
                        .eq("game_id", game_id)
                        .eq("is_dead", false);

    const { data: missions, error: e_m } = await supabase
        .from("missions")
        .select("*")
        .eq("game_id", game_id);
    
    let state = game.state;

    let remaining_mission = shuffle(missions);
    let alive_players_shuffled = shuffle(alive_players);
    let last_mission;

    alive_players_shuffled.forEach((player, index, alive_players) => {
        if (remaining_mission.length <= 2){
            remaining_mission = shuffle(missions);
        }

        let target_index = (index + 1) % alive_players.length;
        let target_name = alive_players[target_index].name;
        let target_id = alive_players[target_index].user_id;
        let mission = remaining_mission.pop();
        let desc = mission.description;
        
        while(last_mission == mission){
            mission = remaining_mission.pop();
        }
    
        state.loop[player.user_id].mission = desc;
        state.loop[player.user_id].target_id = target_id;
        state.loop[player.user_id].target_name = target_name;

        last_mission = mission;
    });

    await updateGameState(supabase, game_id, state);

    return {
        success: true,
        message: "Successfully Shuffle Game State"
    }
}

async function resetPlayer(supabase: SupabaseClient, game_id: number){
    await supabase
    .from("players")
    .update({
        score: 0,
        is_dead: false,
    })
    .eq("game_id", game_id);
}

export async function InitGameState(supabase: SupabaseClient, game_id: number){
    const { data: game, error: e_g } = await supabase
                        .from("games")
                        .select("*")
                        .eq("id", game_id)
                        .single();

    const { data: update_start, error: e_start } = await supabase
            .from("games")
            .update({
                is_started: false,
                is_finish: false
            })
            .eq("id", game_id)

    if (e_start != null) {
        return {
            success: false,
            message: `An error occured : {e_start}`
        }
    }

    const { data: players, error: e_p } = await supabase
                        .from("players")
                        .select()
                        .eq("game_id", game_id);
    
    const { data: missions, error: e_m } = await supabase
                        .from("missions")
                        .select()
                        .eq("game_id", game_id);

    let state = {
        loop: {}
    };
    state['#players'] = 0;
    state['#alive_players'] = 0;

    let remaining_mission = shuffle(missions);
    let players_shuffled = shuffle(players);
    let last_mission;

    players_shuffled.forEach((player, index, players) => {
        if (remaining_mission.length <= 2){
            remaining_mission = shuffle(missions);
        }

        let target_index = (index + 1) % players.length;
        let target_name = players[target_index].name;
        let target_id =  players[target_index].user_id;
        let mission = remaining_mission.pop();

        while(last_mission == mission){
            mission = remaining_mission.pop();
        }

        let desc = mission.description;

        let player_mission = {
            target_name: target_name,
            target_id: target_id,
            mission: desc
        };
    
        state.loop[player.user_id] = player_mission;
        state['#players'] += 1;
        state['#alive_players'] += 1;

        last_mission = mission
    });

    await updateGameState(supabase, game_id, state);
    await resetPlayer(supabase, game_id);

    return {
        success: true,
        message: "Successfully Reset Game State"
    }
}

export async function fetchGameState(supabase: SupabaseClient, game_id: number){
    let {data, error} = await supabase
        .from("games")
        .select("state")
        .eq("id", game_id)
        .single();
    return data;
}

export async function updateGameState(supabase: SupabaseClient, game_id: number, state: Object){
    let {data, error} = await supabase
        .from("games")
        .update({state: state})
        .eq("id", game_id);
}

export async function setPlayerDead(supabase: SupabaseClient, game_id: number, killed_player_id: string) {
    let {data, error} = await supabase
        .from("players")
        .update({is_dead: true})
        .eq("game_id", game_id)
        .eq("user_id", killed_player_id);
}

export async function addScore(supabase: SupabaseClient, game_id: number, player_id: string, added_score: number = 1) {
    let {data: {score}, error} = await supabase
        .from("players")
        .select("score")
        .eq("game_id", game_id)
        .eq("user_id", player_id)
        .single();

    await supabase
        .from("players")
        .update({score: score + added_score})
        .eq("game_id", game_id)
        .eq("user_id", player_id);
}

export async function killLogic(supabase: SupabaseClient, game_id: number, killed_player_id: string, killer_player_id: string, add_score : boolean = true) {
    let { state } = await fetchGameState(supabase, game_id);

    setPlayerDead(supabase, game_id, killed_player_id);

    let kill_history = [];
    if ('kill_history' in state.loop[killer_player_id]){
        kill_history = state.loop[killer_player_id].kill_history;
    }
    kill_history.push(state.loop[killer_player_id].target_name);
    state.loop[killer_player_id] = state.loop[killed_player_id];
    state.loop[killer_player_id].kill_history = kill_history;
    
    state.loop[killed_player_id].killed_by_id = killer_player_id;
    state.loop[killed_player_id].is_dead = true;
    state['#alive_players'] -= 1;

    await updateGameState(supabase, game_id, state);
}

export function findKillerIdFromKilledId(killed_id : string, game_loop : Object){
    let killer_id;
    Object.keys(game_loop).forEach((user_id) => {
        console.log(game_loop[user_id].target_id, killed_id);

        if (game_loop[user_id].target_id == killed_id) killer_id = user_id;
    });
    return killer_id;
}