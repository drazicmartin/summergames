<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import GiCastle from 'svelte-icons/gi/GiCastle.svelte'
    import GiTakeMyMoney from 'svelte-icons/gi/GiTakeMyMoney.svelte'
    import GiBoulderDash from 'svelte-icons/gi/GiBoulderDash.svelte'
    import GiHandOk from 'svelte-icons/gi/GiHandOk.svelte'
    import GiLightBulb from 'svelte-icons/gi/GiLightBulb.svelte'
</script>

<div class="mt-28 flex justify-center i tems-center">
    <div class="w-4/5">
        <Accordion>
            <AccordionItem open>
                <svelte:fragment slot="lead">
                    <div class="icon">
                        <GiCastle />
                    </div>    
                </svelte:fragment>
                
                <svelte:fragment slot="summary">
                    Les Summer Games quèsaco ?
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <p class="text-justify">
                        C'est un événement amusant et compétitif entre amis sur un weekend !<br>
                        L'idée général c'est que <b>deux</b> équipe s'affronte en jouant à des Jeux/Activités que l'on a prévu.
                        À la fin du weekend l'équipe avec le plus de point remporte le titre de <b>Vainqueur des Summer Games !</b> <br><br>
                        À coté de la compétition, vous avez également jeux que vous pouvez faire à n'importe quel moment.
                    </p>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="lead">
                    <div class="icon">
                        <GiBoulderDash />
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="summary">à propos des jeux</svelte:fragment>
                <svelte:fragment slot="content">
                    <p class="text-justify">
                        Pour les jeux on essais de diversifier au maximum entre jeux physiques, jeux stratégiques et jeux créatifs. <br><br>
                        Certains jeux seront inédits, mais d'autres seront issus de l'édition précédente. Pour les nous summerien et summuerienne, nous préférons ne pas donner de détails sur les jeux pour que vous ayez la surprise.
                    </p>
                </svelte:fragment>
            </AccordionItem>

            <AccordionItem>
                <svelte:fragment slot="lead">
                    <div class="icon">
                        <GiHandOk />
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="summary">L'organisation</svelte:fragment>
                <svelte:fragment slot="content">
                    <p class="text-justify">
                        On s'occupe presque de tout, achat de l'équipement, des boissons, des repas. Vous n'avez rien a apporter à ce niveau là, en échange on vous demande une contribution de 30€. Le but n'est absolument pas de faire du profit, simplement d'organiser un weekend sympa entre amis ! <br><br>
                        Vous devrez cependant venir avec votre matos de camping, tentes, matelas, sacs de couchage, (lampe frontale ?), et tout autre équipement nécessaire pour assurer votre confort pendant votre séjour en plein air.
                    </p>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="lead">
                    <div class="icon">
                        <GiTakeMyMoney />
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="summary">Vôtre implication</svelte:fragment>
                <svelte:fragment slot="content">
                    <p class="text-justify">
                        Pour rendre les Summer Games possible nous vous demandons un participation financière de <b>30€</b>.<br><br>
                        Même si on aura prévu la plus par des choses à l'avance, certaine resterons à faire le jour J. Tel que l'installation des jeux, la préparation de la nourriture, un peu de rangement, de la logistique, etc... <br><br>
                        À la dernière édition, nous avions eu un peu de mal à trouver des volontaires, nous comptons sur vous pour vous proposer spontanément afin de nous aider. On compte sur vous =D 
                    </p>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="lead">
                    <div class="icon">
                        <GiLightBulb />
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="summary">Pense bêtes</svelte:fragment>
                <svelte:fragment slot="content">
                    <ul class="list-disc">
                        <span class="text-2xl">Pour dormir</span>
                        <li>tente</li>
                        <li>matela</li>
                        <li>duvet / couverture</li>
                        <li>oreiller</li>
                        <li>lampe torche</li>
                        <li>pyjama</li>
                        <br>
                        <span class="text-2xl">Vos affaires</span>
                        <li>Basket</li>
                        <li>T-shirt de sport</li>
                        <li>Short / pantalon de sport</li>
                        <li>servitte</li>
                        <li>maillot de bain</li>
                        <li>brosse à dents et dentifrice</li>
                        <br>
                        <span class="text-2xl">En Supplément</span>
                        <li>Votre bonne humeur =D</li>
                    </ul>
                </svelte:fragment>
            </AccordionItem>
        </Accordion>
    </div>
</div>


<style>
  .icon {
    width: 32px;
    height: 32px;
  }

  li {
    margin-left: 10%;
  }
</style>