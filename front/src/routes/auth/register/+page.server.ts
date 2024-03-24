// src/routes/login/+page.server.js
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

// src/routes/login/+page.server.ts
export const actions = {
  register: async ({ request, locals: {supabase } }) => {
    const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			return fail(400, {
				error: 'Please enter your email'
			});
		}
		if (!password) {
			return fail(400, {
				error: 'Please enter a password',
				values: {
					email
				}
			});
		}

		const { error } = await supabase.auth.signUp({
			email,
			password
		});

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false, email })
    }

    throw redirect(302, "/");
  }
}