<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

{@render children?.()}

<style>
    :global(body) {
        background-color: rgb(16, 16, 32);
    }
</style>
