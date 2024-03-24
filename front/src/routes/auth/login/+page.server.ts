// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

// src/routes/login/+page.server.ts
export const actions = {
  login: async ({ request, url, locals: { supabase } }) => {

    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false, email })
    }

    throw redirect(302, "/");
  },
}