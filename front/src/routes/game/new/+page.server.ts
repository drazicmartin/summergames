// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const actions = {
    create_game: async ({ request, locals: { supabase }}) => {
        const formData = await request.formData();
    
        const game_name = formData.get('game_name') as string;
        const date = formData.get('date') as unknown as Date;
        const admin_player = formData.get('admin_player') as unknown as boolean;

        if (!game_name) {
            return fail(400, {
                error: 'Please enter a game name',
                date,
            });
        }
        if (!date) {
            return fail(400, {
                error: 'Please enter a start day and time',
                game_name,
            });
        }

        const { data, error } = await supabase
            .from('games')
            .insert({ name : game_name})
            .select()
            .single();

        const game_id = data.id;
            
        if (error) {
            return fail(500, { message: 'Server error. Try again later.', success: false })
        }

        if (admin_player && game_id){
            let { data, error } = await supabase
                .rpc('add_self_to_game', {
                    "input_game_id": game_id,
                })
        }
    
        throw redirect(302, "/");
    }
}
