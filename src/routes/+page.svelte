<script lang="ts">
    import { getMoodImages } from "$lib";

    let moods = $state<string[]>([]);
    moods = getMoodImages();
</script>

<main class="w-screen h-screen grid grid-cols-2">
    {#each moods as item}
        <div class="w-full h-full">
            <img class="w-full h-full aspect-square" src={item} alt="" />
        </div>
    {/each}
</main>
