<script lang="ts">
    const imageModules = import.meta.glob(
		'/src/lib/imgs/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	)
</script>
    
<div class="mt-32 mx-5 mb-5">
    <div class="mb-5 text-center">
        <div class="text-3xl font-bold text-center">
            Quelques photos des éditions précédentes
        </div>
        <div class="text-lg">
            Toutes les photos sont disponibles au téléchargement en cliquant sur le bouton en dessous, n'hésitez pas à téléverser vos photos pour les ajouter à la galerie.
        </div>
        <button type="button" class="btn mt-3">
            <a class="link" href="https://immich.summer-games.fr/share/Hjt6xEY5CjfQFY1sYZ7iXAM2mSknwvMoiMPuuLPxUpEhyUItjiop2-0NOrW1q-SrSR8">Toutes les Photos & Vidéos</a>
        </button>
    </div>
    <div class="grid grid-cols-2 gap-2">
        {#each Object.entries(imageModules) as [_path, module]}
            <div>
                <img class="h-auto max-w-full rounded-lg" src={module.default} alt=""/>
            </div>
        {/each}
    </div>
</div>
