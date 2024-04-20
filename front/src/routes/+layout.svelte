<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import "../app.pcss";
    import '../styles.css'
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
	import FloatingNavbar from "$lib/components/ui/FloatingNavbar/FloatingNavbar.svelte";

    export let data

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
			name: 'Inscription',
			link: '/register',
		},
		// {
		// 	name: 'Connection',
		// 	link: '/',
		// },
	];
</script>

<svelte:head>
	<title>Summer Games</title>
</svelte:head>

<div class="relative w-full">
	<FloatingNavbar {navItems} />
</div>
<slot></slot>
