<script lang="ts">
    import { getMoodImages, getMoodName } from "$lib";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let moods = $state<string[]>([]);
    moods = getMoodImages();

    let showStartMsg = $state(true);
    onMount(() => (showStartMsg = false));

    let hoveredIndex = $state<number | null>(null);

    $effect(() => console.log(moods));
</script>

<main class="w-screen h-screen bg-black text-white">
    {#if showStartMsg}
        <div
            class="w-full h-full bg-black/50 fixed flex justify-center items-center backdrop-blur-[16px]"
            out:fade={{ duration: 500, delay: 1800 }}
        >
            <span
                class="text-4xl font-semibold text-center leading-18"
                style="text-shadow: -4px 4px 0 black;"
                out:fade={{ duration: 500, delay: 1500 }}
            >
                how are you feeling right now?
            </span>
        </div>
    {/if}

    <div class="flex flex-col w-full h-full">
        <div class="flex gap-[1px] w-full">
            {#each moods as item, index}
                <button
                    class="w-full h-full aspect-square"
                    onmouseenter={() => (hoveredIndex = index)}
                    onmouseleave={() => (hoveredIndex = null)}
                >
                    <img
                        class="w-full h-full"
                        src={item}
                        alt=""
                        draggable="false"
                    />
                </button>
            {/each}
        </div>

        <input
            type="text"
            class="w-full h-full bg-white/5 focus:outline-none px-6 placeholder:italic"
            placeholder="how are you feeling right now?"
        />
    </div>
</main>
