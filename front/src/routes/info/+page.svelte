<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import GiCastle from 'svelte-icons/gi/GiCastle.svelte'
    import GiTakeMyMoney from 'svelte-icons/gi/GiTakeMyMoney.svelte'
    import GiBoulderDash from 'svelte-icons/gi/GiBoulderDash.svelte'
    import GiHandOk from 'svelte-icons/gi/GiHandOk.svelte'
    import GiLightBulb from 'svelte-icons/gi/GiLightBulb.svelte'
</script>

<div class="mt-32 flex justify-center items-center">
    <div class="w-4/5">
        <Accordion>
            <AccordionItem open>
                {#snippet lead()}
              
                      <div class="icon">
                          <GiCastle />
                      </div>    
                  
              {/snippet}
                
                {#snippet summary()}
              
                      Les Summer Games quèsaco ?
                  
              {/snippet}
                {#snippet content()}
              
                      <p class="text-justify">
                          C'est un événement divertissant et compétitif entre amis pendant un week-end!<br>
                          L'idée générale c'est que <b>deux</b> équipes s'affrontent en jouant à des Jeux/Activités que l'on a organisés.
                          À la fin du week-end, l'équipe avec le plus de points remporte le titre de <b>Vainqueur des Summer Games !</b> <br><br>
                          En plus de participer à la compétition, vous aurez également la possibilité de jouer à d'autres jeux en libre-service à tout moment le temps que l'on organise votre prochain défi !.
                      </p>
                  
              {/snippet}
            </AccordionItem>
            <AccordionItem>
                {#snippet lead()}
              
                      <div class="icon">
                          <GiBoulderDash />
                      </div>
                  
              {/snippet}
                {#snippet summary()}
                à propos des jeux
              {/snippet}
                {#snippet content()}
              
                      <p class="text-justify">
                          La compétition sera composée de jeux stratégiques, à mémoire, physiques et créatifs. <br><br>
                          Certains jeux seront issus de l'édition précédente mais d'autres seront inédits ! Pour les nouveaux participants, nous préférons ne pas donner de détails sur les jeux pour que vous ayez la surprise.
                      </p>
                  
              {/snippet}
            </AccordionItem>

            <AccordionItem>
                {#snippet lead()}
              
                      <div class="icon">
                          <GiHandOk />
                      </div>
                  
              {/snippet}
                {#snippet summary()}
                L'organisation
              {/snippet}
                {#snippet content()}
              
                      <p class="text-justify">
                          On s'occupe (presque) de tout, achats de l'équipement pour les activités, les boissons, les repas. Vous n'avez rien a apporter à ce niveau là. En échange on vous demande une contribution de 30€ afin d'acheter tout ce qu'il vous faut. Le but est simplement d'organiser un week-end sympa entre amis ! <br><br>
                          Vous devrez cependant venir avec votre matos de camping, tentes, matelas, sacs de couchage, (lampe frontale ?), et tout autre équipement nécessaire pour assurer votre confort pendant votre séjour en plein air.
                          <br>
                          Rendez-vous le vendredi <b>28 août</b> à partir de <b>16h</b> jusqu'au dimanche <b>30 août</b> après-midi à Lieurey, 61 impasse des Croix bigeolles 27560. (En Normandie)
                      </p>
                  
              {/snippet}
            </AccordionItem>
            <AccordionItem>
                {#snippet lead()}
              
                      <div class="icon">
                          <GiTakeMyMoney />
                      </div>
                  
              {/snippet}
                {#snippet summary()}
                Vôtre implication
              {/snippet}
                {#snippet content()}
              
                      <p class="text-justify">
                          Pour rendre les Summer Games possible nous vous demandons une participation financière de <b>30€</b>.<br><br>
                          Cette participation nous permet de couvrir les frais d'achats de nourriture et de boissons, ainsi qu'une partie de l'achat de matériel pour les jeux. <br><br>
                          Même si on aura prévu la plupart des choses à l'avance, certaines resteront à faire le jour J. Tel que l'installation des jeux, la préparation de la nourriture, un peu de rangement, de la logistique, etc... <br><br>
                          Votre aide est grandement la bienvenue pendant le week-end !
                      </p>
                  
              {/snippet}
            </AccordionItem>
            <AccordionItem>
                {#snippet lead()}
              
                      <div class="icon">
                          <GiLightBulb />
                      </div>
                  
              {/snippet}
                {#snippet summary()}
                Pense bêtes
              {/snippet}
                {#snippet content()}
              
                      <ul class="list-disc">
                          <span class="text-2xl">Pour dormir</span>
                          <li>tente</li>
                          <li>matelas</li>
                          <li>duvet / couverture</li>
                          <li>oreiller</li>
                          <li>lampe torche</li>
                          <li>pyjama</li>
                          <br>
                          <span class="text-2xl">Vos affaires</span>
                          <li>Basket</li>
                          <li>T-shirt de sport</li>
                          <li>Short / pantalon de sport</li>
                          <li>serviette</li>
                          <li>maillot de bain</li>
                          <li>brosse à dents et dentifrice</li>
                      </ul>
                  
              {/snippet}
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