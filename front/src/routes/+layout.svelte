<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import "../app.pcss";
    import '../styles.css'
    import { invalidate } from '$app/navigation'
	import { Toast, Modal, initializeStores } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte'
	import FloatingNavbar from "$lib/components/ui/FloatingNavbar/FloatingNavbar.svelte";
	import { page } from '$app/stores';
	initializeStores();

    export let data
	
	let currentPath: string = '';
	let isGamePage = false;

	// Subscribe to the $page store
	$: currentPath = $page?.url?.pathname || '';
	
	// Check for '/game' in the URL when the component is mounted or the URL changes
	$: isGamePage = currentPath.includes('/game');
	

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
		{
			name: 'Killer',
			link: '/game',
		},
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
<Modal />

<svelte:head>
	<title>Summer Games</title>
</svelte:head>

{#if !isGamePage}
<div class="relative w-full">
	<FloatingNavbar {navItems} {is_logged} />
</div>
{/if}
<slot/>
