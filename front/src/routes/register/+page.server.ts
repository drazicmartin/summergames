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
        num_player : players?.length ?? 0
    };
}

// src/routes/login/+page.server.ts
export const actions = {
  register: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
        
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const vege = formData.get('vege') as unknown as boolean;
    const killer = formData.get('killer') as unknown as boolean;
    const insta = formData.get('insta') as unknown as boolean;
    const msg = formData.get('msg') as string;
    const birthdate = formData.get('birthdate') as string;

    let input_data = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        vege: vege,
        insta: insta,
        msg: msg,
        killer: killer,
        birthdate: birthdate,
    }

    if (!email) {
        return fail(400, {
            message: 'Please enter your email',
            success: false,
            input_data: input_data,
        });
    }

    if (!password) {
        return fail(400, {
            message: 'Please enter your password',
            success: false,
            input_data: input_data,
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
                input_data: input_data,
            })
    }
    
    const { data, error } = await supabase
        .from('players')
        .insert([
            { 
                user_id: register_data.user?.id,
                firstname: firstname,
                lastname: lastname,
                vege: vege, 
                insta: insta,
                message: msg,
                killer: killer,
                birthdate: birthdate,
                email: email,
                name: `${firstname} ${lastname}`,
            },
        ])
        .select()
    
    if (error) {
        return fail(500, 
            { 
                message: error.message,
                success: false,
                input_data: input_data,
            })
    }


    return {
        message: "Inscription enregistrée ! =D",
        success: true,
    }
  }
}