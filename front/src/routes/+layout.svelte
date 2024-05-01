<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import "../app.pcss";
    import '../styles.css'
    import { invalidate } from '$app/navigation'
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte'
	import FloatingNavbar from "$lib/components/ui/FloatingNavbar/FloatingNavbar.svelte";

    export let data

	initializeStores();

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})


	const navItems = [
		{
			name: 'Accueil',
			link: '/',
		},
		{
			name: 'Info',
			link: '/info',
		},
		// {
		// 	name: 'Connection',
		// 	link: '/',
		// },
	];

	if (!data?.session) {
		navItems.push({
			name: 'Inscription',
			link: '/register',
		})
	}

	let is_logged: boolean;
	$: (is_logged = session ? true : false)
</script>

<Toast />

<svelte:head>
	<title>Summer Games</title>
</svelte:head>

<div class="relative w-full">
	<FloatingNavbar {navItems} {is_logged} />
</div>
<slot></slot>
