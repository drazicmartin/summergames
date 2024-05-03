<script lang="ts">
    import { getModalStore, type ModalComponent, type ModalSettings, type ToastSettings  } from '@skeletonlabs/skeleton';
    import { onMount, tick } from 'svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';

    export let form;
    export let data;

    const toastStore = getToastStore();

    onMount(async () => {
        if (form != null){
            let background: string;
            if (form.success) {
                background = "variant-filled-primary";
            } else {
                background = "variant-filled-error";
            }

            const t: ToastSettings = {
                message: form.message,
                background: background,
            };

            toastStore.trigger(t);
        }
	});
</script>

<div class="mt-28 flex justify-center items-center">
    <div class="w-4/5">
        <div class="text-3xl text-center">Actuellement <span class="text text-red-500">
            {data.nb_registered}</span> inscrit{data.nb_registered > 1 ? 's' : ''} ! 
            <br>
            <span class="text-xs">(c'est toi le prochain ?)</span>
        </div>
        <form action="?/register" method="post">
            
            <span>Création d'un compte</span>
            <label class="label">
                <input required name="email" class="input text-black" title="Input (email)" type="email" placeholder="xyz@example.com" autocomplete="email" value={form?.email ?? ''} />
            </label>
            <label class="label">
                <!-- <span>Mot de passe</span> -->
                <input required name="password" class="input text-black" title="Input (password)" type="password" placeholder="Mot de passe" />
            </label>

            <div class="flex justify-center space-y-2">
                <label class="flex items-center space-x-2">
                    <input name="killer" class="checkbox" type="checkbox"/>
                    <p class="text-red-500 text-lg" >Je participe au jeu du killer</p>
                </label>
            </div>

            <br>
            <span>Information générale</span>
            <label class="label">
                <!-- <span>Nom</span> -->
                <input required name="lastname" class="input text-black" title="Input (text)" type="text" placeholder="Nom" value={form?.last_name ?? ''} />
            </label>
            <label class="label">
                <!-- <span>Prénom</span> -->
                <input required name="firstname" class="input text-black" title="Input (text)" type="text" placeholder="Prénom" value={form?.first_name ?? ''} />
            </label>
            
            <div class="flex justify-center space-y-2">
                <label class="flex items-center space-x-2">
                    <input name="vege" class="checkbox" type="checkbox"/>
                    <p class="text-green-600 text-lg" >Je suis végé</p>
                </label>
            </div>

            <br>

            <span>Un message, une idée, un jeu à nous proposer ?</span>
            <label class="label">
                <input name="message" class="flex input text-black justify-center" title="extra" type="text" placeholder="..." value={form?.msg ?? ''} />
            </label>
            
            <br>

            <label class="flex items-center space-x-2">
                <input name="insta" class="checkbox" type="checkbox"/>
                <p class="text-gray text-xs">J'accepte d'être sur les photos Instagram du compte des Summer Games</p>
            </label>

            <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox" required/>
                <p class="text-red-500 text-xs">J'accepte de payer la somme de 30€ (Lydia au 0781044869, ou en espèce le jour J)</p>
            </label>

            <div class="flex justify-center mt-5 mb-10">
                <button type="submit" class="btn-xl border-orange-400">
                    S'inscrire
                </button>
            </div>
        </form>
    </div>
</div>


<style>
    .input {
        text-align: center;
    }
</style>