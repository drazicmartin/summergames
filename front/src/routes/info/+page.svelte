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
                        L'idée général c'est que <b>deux</b> équipes s'affrontent en jouant à des Jeux/Activités que l'on a organisés.
                        À la fin du weekend, l'équipe avec le plus de points remporte le titre de <b>Vainqueur des Summer Games !</b> <br><br>
                        En plus de participer à la compétition, vous aurez également la possibilité de jouer à d'autres jeux en libre services à tout moment.
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
                        La compétition sera composée de jeux physiques, stratégiques et créatifs. <br><br>
                        Certains jeux seront issus de l'édition précédente mais d'autre seront inédits ! Pour les nouveaux participants, nous préférons ne pas donner de détails sur les jeux pour que vous ayez la surprise.
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
                        On s'occupe (presque) de tout, achats de l'équipement pour les activités, des boissons, des repas. Vous n'avez rien a apporter à ce niveau là. En échange on vous demande une contribution de 30€. Le but est simplement d'organiser un weekend sympa entre amis ! <br><br>
                        Vous devrez cependant venir avec votre matos de camping, tentes, matelas, sacs de couchage, (lampe frontale ?), et tout autre équipement nécessaire pour assurer votre confort pendant votre séjour en plein air.
                        <br>
                        Rendez-vous le vendredi <b>30 août</b> à partir de <b>16h</b> jusqu'au dimanche <b>1 septembre</b> après-midi à Lieurey, 61 impasse des Croix bigeolles 27560. (En normandie) 
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
                        Votre aide est essentiel pour que ce week-end soit un succès !
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