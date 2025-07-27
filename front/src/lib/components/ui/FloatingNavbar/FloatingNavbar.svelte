<script lang="ts">
    import { run } from 'svelte/legacy';

	import { Motion, AnimatePresence, useViewportScroll, useMotionValue } from 'svelte-motion';
	import { cn } from '$lib/utils/cn';
    import { page } from '$app/stores';

    interface Props {
        navItems: {
		name: string;
		link: string
	}[];
        className?: string | undefined;
        is_logged?: boolean;
    }

    let { navItems, className = undefined, is_logged = false }: Props = $props();

	// const { scrollYProgress } = useScroll();
	const { scrollYProgress } = useViewportScroll();

	let visible = false;


	function updateDirection() {
		let direction = $scrollYProgress - scrollYProgress.getPrevious();

		if (scrollYProgress.get() < 0.05) {
			visible = true;
		} else {
			if (direction < 0) {
				visible = true;
			} else {
				visible = true;
			}
		}
	}
	run(() => {
        $scrollYProgress, updateDirection();
    });
</script>

<AnimatePresence show={true}>
    <div
        class={cn(
            'fixed inset-x-0  top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-white py-2 pl-2 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black',
            className
        )}
    >
        {#each navItems as navItem, idx (`link=${idx}`)}
            {#if $page.url.pathname == navItem.link}
                <button
                    class="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
                >
                    <span>{navItem.name}</span>
                    <span
                        class="absolute inset-x-0 text-lg -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
></span>
                </button>
            {:else}
                <a
                    href={navItem.link}
                    class={cn(
                        "relative rounded-full border border-neutral-200 px-4 py-2 text-lg font-medium text-black dark:border-white/[0.2] dark:text-white"
                    )}
                >
                    {navItem.name}
                </a>
            {/if}
        {/each}
        {#if is_logged}
            <form method="post" action="/account?/signout">
                <button class="relative bg-white rounded-full border border-neutral-200 px-4 py-2 text-lg font-medium text-black dark:border-white/[0.2] dark:text-white">
                    logout
                </button>
            </form>
        {/if}
    </div>
</AnimatePresence>