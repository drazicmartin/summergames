import { redirect } from '@sveltejs/kit';

export const load = async ({ parent, params }) => {
  let {is_admin, game, self_player} = await parent();

  if (!is_admin && (!self_player.is_dead || !game.is_started)){
    throw redirect(308, `/game/${game.id}`);
  }
}