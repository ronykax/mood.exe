<script lang="ts">
    import { getMoodImages, getMoodName } from "$lib";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let moods = $state<string[]>([]);
    moods = getMoodImages();

    let showStartMsg = $state(true);
    onMount(() => (showStartMsg = false));

    let placeholder = $state("how are you feeling right now?");

    let startAnimation = $state(false);
    onMount(() => (startAnimation = true));
</script>

<main
    class="w-screen h-screen text-white p-1 bg-gradient-to-r from-stone-500 to-stone-700"
>
    {#if showStartMsg}
        <div
            class="w-full h-full bg-black/50 fixed top-0 right-0 z-[50] flex justify-center items-center backdrop-blur-[16px]"
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

    <div class="flex flex-col w-full h-full rounded-[6px] overflow-hidden gap-1">
        <div class="flex gap-1 w-full">
            {#each moods as item, index}
                {#if !showStartMsg && startAnimation}
                    <button
                        class="w-full h-full aspect-square cursor-pointer overflow-hidden group"
                        in:fade={{ delay: (index + 1) * 200, duration: 600 }}
                    >
                        <img
                            class="w-full h-full object-cover hover:scale-[112%] duration-150 shadow-xs"
                            src={item}
                            alt={item}
                            draggable="false"
                        />

                        <div class="w-full h-full text-2xl">hi</div>
                    </button>
                {/if}
            {/each}
        </div>

        <input
            type="text"
            class="w-full h-full bg-black/65 focus:outline-none px-6 placeholder:italic"
            {placeholder}
        />

        <!-- <input
            type="text"
            class="w-full h-full bg-white/10 focus:outline-none px-6 placeholder:italic"
            {placeholder}
        /> -->
    </div>
</main>
