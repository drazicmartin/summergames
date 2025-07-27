<!-- // src/routes/login/+page.svelte -->
<script>
    /** @type {{form: any}} */
    let { form } = $props();
</script>

{#if form}
<h4>
    {form.message}
</h4>
{/if}

<div class="mt-28 flex justify-center items-center">
    <div class="w-4/5">
        <form action="?/login" method="post">
            
            <span>Connexion</span>
            <label class="input input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="Email" required name="email" autocomplete="email" value={form?.email ?? ''} />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                <input type="password" class="grow" required name="password" placeholder="Mot de passe"/>
            </label>

            <div class="mb-12 pb-1 pt-1 text-center">
                <button
                    class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="submit"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                Se connecter
                </button>
            </div>
        </form>
    </div>
</div>


<style>
    input {
        text-align: center;
        border-width: 0px;
    }
</style>