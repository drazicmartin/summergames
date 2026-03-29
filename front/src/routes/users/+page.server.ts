import { error } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

export const load = async ({ locals: { supabase }, url }) => {
  const expectedPassword = env.ADMIN_PASSWORD || ''
  const providedPassword = url.searchParams.get('admin_password')

  if (!expectedPassword) {
    throw error(500, 'Admin password not configured on server')
  }

  if (!providedPassword || providedPassword !== expectedPassword) {
    throw error(401, 'Unauthorized')
  }

  const { data: players, error: fetchError } = await supabase
    .from('players')
    .select('user_id, name, firstname, lastname, birthdate, phone, vege, insta, killer, created_at')
    .order('created_at', { ascending: false })

  if (fetchError) {
    console.error('Unable to fetch users list', fetchError)
    return {
      players: [],
      error: fetchError.message,
    }
  }

  return {
    players: players ?? [],
  }
}
