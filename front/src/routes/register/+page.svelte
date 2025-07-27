<!-- @migration-task Error while migrating Svelte code: Event attribute must be a JavaScript expression, not a string -->
<script lang="ts">
    import { getModalStore, type ModalComponent, type ModalSettings, type ToastSettings  } from '@skeletonlabs/skeleton';
    import { onMount, tick } from 'svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import BorderBeam from "$lib/components/ui/BorderBeam/BorderBeam.svelte";

    export let form;
    export let data;
    let t : ToastSettings;

    onMount(async () => {
        if (form != null){
            let background: string;
            if (form.success) {
                background = "variant-filled-primary";
            } else {
                background = "variant-filled-error";
            }

            t = {
                message: form.message,
                background: background,
            };
        }
	});
</script>

{#if form != null}
<div class="fixed bottom-0 left-0 w-full flex justify-center">
    <div class="absolute bottom-0 mb-8 w-1/2">
        <div class="flex w-full items-center justify-between p-5 leading-normal {t?.background} rounded-lg" role="alert">
          <p>{t?.message}</p>
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z"/>
        </div>
    </div>
</div>
{/if}
    

<div class="mt-28 flex justify-center items-center">
    <div class="w-4/5">
        <div class="text-4xl mt-5 text-center">Actuellement <span class="text text-red-500" style="font-family: 'SG';">
            {data.nb_registered}</span> inscrit{data.nb_registered > 1 ? 's' : ''} ! 
            <br>
            <span class="text-xs">seras-tu le prochain ?</span>
        </div>
        <form action="?/register" method="post">
            
            <span>Création d'un compte</span>
            <label class="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="pl-4 h-6"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input type="text" class="grow input flex items-center gap-2 bg-white" placeholder="Email" required name="email" autocomplete="email" value={form?.email ?? ''} />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="pl-4 h-6"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
                <input type="password" class="grow input flex items-center gap-2 bg-white" required name="password" placeholder="Mot de passe"/>
            </label>

            <div class="flex justify-center space-y-2">
                <label class="flex items-center space-x-2">
                    <input name="killer" class="checkbox" type="checkbox"/>
                    <p class="text-red-500 text-lg" >Je participe au jeu du killer</p>
                </label>
            </div>

            <br>
            <span>Information générale</span>
            <input type="text" class="grow input flex items-center gap-2 bg-white my-2" placeholder="Nom" required name="lastname" value={form?.last_name ?? ''} />
            <input type="text" class="grow input flex items-center gap-2 bg-white my-2" placeholder="Prénom" required name="firstname" value={form?.first_name ?? ''} />
            
            <div class="flex justify-center space-y-2">
                <label class="flex items-center space-x-2">
                    <input name="vege" class="checkbox" type="checkbox"/>
                    <p class="text-green-600 text-lg" >Je suis végé</p>
                </label>
            </div>

            <br>

            <span>Un message, une idée, un jeu à nous proposer ?</span>            
            <input type="text" class="input input-bordered flex items-center gap-2 w-full bg-white" placeholder="Message" name="message" title="message" value={form?.msg ?? ''}/>

            <br>

            <label class="flex items-center space-x-2">
                <input name="insta" class="checkbox" type="checkbox"/>
                <p class="text-gray text-xs">J'accepte d'être sur les photos Instagram du compte des Summer Games</p>
            </label>

            <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox" required/>
                <p class="text-red-500 text-xs">J'accepte de payer la somme de 30€ (Summeria au 0781044869, ou en espèce le jour J)</p>
            </label>

            <div class="flex w-full mt-5 mv-5 justify-center">
                <button type="submit" class="flex text-2xl flex-col justify-center relative rounded-3xl p-5 border border-yellow-100 bg-background">
                    <BorderBeam 
                        size={100} duration={5} colorFrom="#028A9B" colorTo="#DE5A5A"
                    /> 
                    Inscription
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