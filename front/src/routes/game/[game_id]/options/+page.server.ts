// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { InitGameState, ShuffleGameState, addScore, fetchGameState, findKillerIdFromKilledId, killLogic, updateGameState } from '$lib/Games.ts';

export const actions = {
    delete_game: async ({ request, locals: { supabase }, params }) => {
        const game_id = params.game_id as unknown as number;

        if (!game_id) {
            return fail(400, {
                error: 'Please specify enter a game id'
            });
        }

        const { error } = await supabase
            .from('games')
            .delete()
            .eq('id', game_id);
        
            
        if (error) {
            return fail(500, { message: 'Server error. Try again later.', success: false })
        }
    
        throw redirect(302, "/");
    },
    change_password: async ({ request, locals: { supabase, safeGetSession }, params }) => {
        let session = await safeGetSession();

        const game_id = params.game_id as unknown as number;

        const formData = await request.formData();

        const current_password = formData.get('current_password') as string;
        const new_password = formData.get('new_password') as string;

        if (!game_id) {
            return fail(400, {
                message: 'Please specify enter a game id',
                success: false
            });
        }

        const { count, data: player_data, error: error_game_id } = await supabase
            .from('players')
            .select('*', { count: 'exact' })
            .eq("user_id", session.user.id)
            .eq("game_id", game_id)
            .single();

        if (count < 1){
            return fail(403, { message: "Unauthorized", success: false});
        }

        if (player_data.password != current_password){
            return fail(403, {message: "Current password does not match", open: "password", success: false})
        }

        const { data, error } = await supabase
            .from('players')
            .update({password: new_password})
            .eq("user_id", session.user.id)
            .eq("game_id", game_id)
            .single();
        
        if (error) {
            console.log(error);
            return fail(500, { message: 'Server error. Try again later.', success: false })
        }

        return {
            success: true,
            message: "Successfully changed password"
        }
    },
    change_name: async ({ request, locals: { supabase, safeGetSession }, params }) => {
        let session = await safeGetSession();

        const game_id = params.game_id as unknown as number;

        const formData = await request.formData();
        const name = formData.get('name') as string;

        if (!game_id) {
            return fail(400, {
                message: 'Please specify enter a game id',
                success: false
            });
        }

        const { data, error } = await supabase
            .from('players')
            .update({name: name})
            .eq("user_id", session.user.id)
            .eq("game_id", game_id)
            .single();
        
        if (error) {
            console.log(error);
            return fail(500, { message: 'Server error. Try again later.', success: false })
        }

        return {
            success: true,
            message: "Successfully changed name"
        }
    },
    delete_user: async ({ request, locals: { supabase, safeGetSession }, params }) => {
        let session = await safeGetSession();

        const game_id = params.game_id as unknown as number;

        const formData = await request.formData();
        const user_id_to_delete = formData.get('user_id') as string;

        if (!game_id) {
            return fail(400, {
                message: 'Please specify enter a game id',
                success: false
            });
        }

        if (user_id_to_delete == session.user.id){
            return fail(403, { message: "You can't delete your self as admin of the game", success: false })
        }

        const { data, error } = await supabase
            .from('players')
            .delete()
            .eq("user_id", user_id_to_delete)
            .eq("game_id", game_id);
        
        if (error) {
            return fail(500, { message: 'Server error. Try again later.', success: false })
        }

        return {
            success: true,
            message: "Successfully Deleted user"
        }
    },
    add_player: async ({ request, locals: { supabase }, params }) => {
        const game_id = params.game_id as unknown as number;

        const formData = await request.formData();
        const player_email = formData.get('player_email') as string;

        if (!game_id) {
            return fail(400, {
                message: 'Please specify enter a game id',
                success: false
            });
        }
        
        let { data, error } = await supabase
            .rpc('add_player_to_game', {
              game_id: game_id, 
              user_email: player_email
            })
        
        if (error) {
            return fail(500, { message: error.message, success: false })
        }

        return {
            success: true,
            message: `Successfully add ${player_email}`
        }
    },
    reset_game_state: async ({ request, locals: { supabase }, params }) => {
        const game_id = params.game_id as unknown as number;

        console.log("Game Reset")

        return InitGameState(supabase, game_id);
    },
    shuffle_game_state: async ({ request, locals: { supabase }, params }) => {
        const game_id = params.game_id as unknown as number;

        console.log("Game Shuffled")

        return ShuffleGameState(supabase, game_id);
    },
    quit_game: async ({ request, locals: { supabase, safeGetSession }, params }) => {
        let session = await safeGetSession();
        const game_id = params.game_id as unknown as number;

        const {data, error} = await supabase
            .from("games")
            .select()
            .eq("id", game_id)
            .single();

        if (data.user_id == session.user.id){
            return fail(500, { message: "You can't leave the game as admin", success: false })
        }

        await supabase
            .from("players")
            .delete()
            .eq("game_id", game_id)
            .eq("user_id", session.user.id);
        
        let {state} = await fetchGameState(supabase, game_id);

        let killer_id = findKillerIdFromKilledId(session.user.id, state.loop);
        if (killer_id){
            state.loop[killer_id] = state.loop[session.user.id];
            
            state.loop[session.user.id].killed_by_id = "Quit Game";
            state.loop[session.user.id].is_dead = true;
            state['#alive_players'] -= 1;
    
            await updateGameState(supabase, game_id, state);

            throw redirect(302, "/");
        }
        else{
            return fail(500, { message: "An error occured", success: false })
        }

    },
    start_game: async ({ request, locals: { supabase }, params }) => {
        const game_id = params.game_id as unknown as number;
        console.log("Game Start")

        await supabase
            .from("games")
            .update({
                is_started: true,
                is_finish: false
            })
            .eq("id", game_id);
            
            return {
                message: "Game Started !",
                success: true,
            }
    },
    stop_game: async ({ request, locals: { supabase }, params }) => {
        const game_id = params.game_id as unknown as number;
        
        await supabase
            .from("games")
            .update({
                is_finish: true,
                is_started: false,
            })
            .eq("id", game_id);

        return {
            message: "Game Stopped",
            success: true,
        }
    },
}

async function fetchAllPlayers(supabase, game_id){
    let { data, error } = await supabase
            .from("players")
            .select()
            .eq("game_id", game_id);
    return data;
}

export const load = async ({ parent, params, locals: {supabase, safeGetSession} }) => {
    let session = (await safeGetSession()).session;

    if (!session) {
        return {};
    }

    let game_id = params.game_id;

    return {
        all_players: await fetchAllPlayers(supabase, game_id),
    }
}