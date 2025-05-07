<script lang="ts">
    import { getMoodImages, getMoodName } from "$lib";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let moods = $state<string[]>([]);
    moods = getMoodImages();

    let showStartMsg = $state(true);
    onMount(() => (showStartMsg = false));
</script>

<main class="w-screen h-screen">
    {#if showStartMsg}
        <div
            class="w-full h-full bg-black/50 fixed flex justify-center items-center text-white backdrop-blur-[16px]"
            out:fade={{ duration: 500, delay: 1750 }}
        >
            <span
                class="text-5xl font-semibold text-center leading-18"
                style="text-shadow: -4px 4px 0 black;"
            >
                how are you feeling right now?
            </span>
        </div>
    {/if}

    <div class="grid grid-cols-2 w-full h-full">
        {#each moods as item}
            <div class="w-full h-full">
                <img
                    class="w-full h-full aspect-square"
                    src={item}
                    alt=""
                    draggable="false"
                />
            </div>
        {/each}
    </div>
</main>
