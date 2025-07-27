<script lang="ts">
	import { run } from 'svelte/legacy';

	import "../app.css";
	import "../app.pcss";
	import '../styles.css'
	import { invalidate } from '$app/navigation'
	import { Toast, Modal, initializeStores } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte'
	import FloatingNavbar from "$lib/components/ui/FloatingNavbar/FloatingNavbar.svelte";
	import { page } from '$app/stores';
	initializeStores();

	interface Props {
		data: any;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let currentPath: string = $state('');
	let isGamePage = $state(false);

	// Subscribe to the $page store
	run(() => {
		currentPath = $page?.url?.pathname || '';
	});

	// Check for '/game' in the URL when the component is mounted or the URL changes
	run(() => {
		isGamePage = currentPath.includes('/game');
	});


	let { supabase, session } = $state(data)
	// run(() => {
	// 	({ supabase, session } = data)
	// });


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

	let is_logged: boolean = $derived(session ? true : false);


	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script><!-- src/routes/+layout.svelte -->


<!-- <Toast/>
<Modal/> -->

<svelte:head>
	<title>Summer Games</title>
</svelte:head>

{#if !isGamePage}
<div class="relative w-full">
	<FloatingNavbar {navItems} {is_logged}></FloatingNavbar>
</div>
{/if}
{@render children?.()}
