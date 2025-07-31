// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

// src/routes/login/+page.server.ts
export const actions: Actions = {
  login: async ({ request, url, locals: { supabase } }) => {

    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log("Login attempt:", { email, data, error });

    if (error) {
      return fail(500, { message: error?.message, success: false, email})
    }

    throw redirect(303, "/game");
  },
}