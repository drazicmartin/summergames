// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { InitGameState, killLogic } from '$lib/Games.js';

export const actions = {
    kill_player: async ({ request, locals: { supabase, safeGetSession }, params }) => {
        const { session, user } = await safeGetSession();

        if (!session || !user) {
            return fail(401, { message: 'Authentication required', success: false });
        }

        const game_id = Number(params.game_id);

        if (!game_id || Number.isNaN(game_id)) {
            return fail(400, {
                message: 'Invalid game id',
                success: false,
            });
        }

        const formData = await request.formData();
        const killed_player_password = String(formData.get('killed_player_password') || '');
        const killed_player_id = String(formData.get('killed_player_id') || '');

        if (!killed_player_id || !killed_player_password) {
            return fail(400, { message: 'Missing kill payload', success: false });
        }

        const { data, error } = await supabase
            .from('players')
            .select()
            .eq('game_id', game_id)
            .eq('user_id', killed_player_id)
            .single();

        if (error || !data) {
            return fail(404, {
                message: error?.message || 'Killed player not found in this game',
                success: false,
            });
        }

        if (data.password !== killed_player_password) {
            return fail(403, { message: 'Password does not match', success: false });
        }

        await killLogic(supabase, game_id, killed_player_id, user.id);

        return {
            success: true,
            message: `You psycho killed ${data.name}`,
        };
    },
};