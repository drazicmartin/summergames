// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals: { supabase } }) {
    let { data: players, error } = await supabase
        .from('players')
        .select('*');
    
    if (error) {
        console.error('Error fetching players:', error);
    }
    
	return {
        nb_registered : players?.length ?? 0
    };
}

// src/routes/login/+page.server.ts
export const actions = {
  register: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
        
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const first_name = formData.get('firstname') as string;
    const last_name = formData.get('lastname') as string;
    const vege = formData.get('vege') as unknown as boolean;
    const killer = formData.get('killer') as unknown as boolean;
    const insta = formData.get('insta') as unknown as boolean;
    const message = formData.get('message') as string;

    if (!email) {
        return fail(400, {
            message: 'Please enter your email',
            success: false,
            email: email,
            first_name: first_name,
            last_name: last_name,
            vege: vege,
            insta: insta,
            msg: message,
            killer: killer
        });
    }

    if (!password) {
        return fail(400, {
            message: 'Please enter your password',
            success: false,
            email: email,
            first_name: first_name,
            last_name: last_name,
            vege: vege,
            insta: insta,
            msg: message,
            killer: killer
        });
    }
    
    const { data: register_data, error: register_error } = await supabase.auth.signUp({
        email: email,
        password: password
    });
    
    if (register_error) {
        return fail(500, 
            { 
                message: register_error.message,
                success: false,
                email: email,
                first_name: first_name,
                last_name: last_name,
                vege: vege,
                insta: insta,
                msg: message,
                killer: killer
            })
    }
    
    const { data, error } = await supabase
        .from('players')
        .insert([
            { 
                user_id: register_data.user?.id,
                firstname: first_name,
                lastname: last_name,
                vege: vege, 
                insta: insta,
                message: message,
                killer: killer,
            },
        ])
        .select()
    
    if (error) {
        return fail(500, 
            { 
                message: error.message,
                success: false,
                email: email,
                first_name: first_name,
                last_name: last_name,
                vege: vege,
                insta: insta,
                msg: message,
                killer: killer,
            })
    }


    return {
        message: "Inscription enregistrée ! =D",
        success: true,
    }
  }
}