import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: players, error } = await supabase
    .from('players')
    .select('user_id, name, email, firstname, lastname, birthdate, phone, vege, insta, killer, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Unable to fetch users list', error)
    return {
      players: [],
      error: error.message,
    }
  }

  return {
    players: players ?? [],
  }
}
