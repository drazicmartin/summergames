<!-- // src/routes/login/+page.svelte -->
<script>
	import { enhance } from '$app/forms'
	export let form
</script>

{#if form}
<h4>
    {form.message}
</h4>
{/if}

<form method="POST" action="?/register">
    <p class="mb-4">Please login to your account</p>
    <!--Username input-->
    <div class="relative mb-4 border-solid">
        <input
        type="text"
        class="peer min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
        value={form?.email ?? ''}
        name="email"
        required
        placeholder="Email" />
    </div>

    <!--Password input-->
    <div class="relative mb-4" data-te-input-wrapper-init>
        <input
        type="password"
        name="password"
        required
        class="peer min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
        id="exampleFormControlInput11"
        placeholder="Password" />
    </div>

    <!--Submit button-->
    <div class="mb-12 pb-1 pt-1 text-center">
        <button
        class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
        type="submit"
        data-te-ripple-init
        data-te-ripple-color="light"
        style="
            background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
        ">
        Log in
        </button>
        <a
            class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="submit"
            data-te-ripple-init
            data-te-ripple-color="light"
            href="register"
            style="
                background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
            ">
            Register
        </a>
    </div>
</form>