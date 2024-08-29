// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { InitGameState, killLogic } from '$lib/Games.js';

export const actions = {
    kill_player: async ({ request, locals: { supabase, getSession }, params }) => {
        let session = await getSession();

        const game_id = params.game_id as unknown as number;

        const formData = await request.formData();
        const killed_player_password = formData.get('killed_player_password') as string;
        const killed_player_id = formData.get('killed_player_id') as string;

        if (!game_id) {
            return fail(400, {
                message: 'Please specify enter a game id',
                success: false
            });
        }
        
        let { data, error } = await supabase
            .from('players')
            .select()
            .eq("game_id", game_id)
            .eq("user_id", killed_player_id)
            .single();
        
        if (error) {
            return fail(500, { message: error.message, success: false })
        }

        if (data.password == killed_player_password){
            await killLogic(supabase, game_id, killed_player_id, session.user.id);
        } else {
            return fail(403, {message: "Password does not match !", success: false});
        }

        return {
            success: true,
            message: `You psycho killed ${data.name}`
        }
    }
}