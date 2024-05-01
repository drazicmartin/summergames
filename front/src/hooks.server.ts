// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, type Handle } from '@sveltejs/kit'

import fs from "fs";

const SUPABASE_ANON_KEY = process.env['PUBLIC_SUPABASE_ANON_KEY'] ?? PUBLIC_SUPABASE_ANON_KEY

console.log(SUPABASE_ANON_KEY);

// detect if we're running inside docker and set the backend accordingly
const supabase_url = fs.existsSync("/.dockerenv")
  ? "http://supabase-kong:8000" // docker-to-docker
  : PUBLIC_SUPABASE_URL; // localhost-to-localhost

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: supabase_url,
    supabaseKey: SUPABASE_ANON_KEY,
    event,
  })

  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}