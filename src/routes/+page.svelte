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

<main class="w-screen h-screen bg-black text-white">
    {#if showStartMsg}
        <div
            class="w-full h-full bg-black/50 fixed z-[50] flex justify-center items-center backdrop-blur-[16px]"
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
                {#if !showStartMsg && startAnimation}
                    <button
                        class="w-full h-full aspect-square relative cursor-pointer overflow-hidden group"
                        in:fade={{ delay: (index + 1) * 200, duration: 600 }}
                    >
                        <img
                            class="w-full h-full object-cover hover:scale-[112%] duration-150"
                            src={item}
                            alt={item}
                            draggable="false"
                        />

                        <div class="w-full h-full">

                        </div>
                    </button>
                {/if}
            {/each}
        </div>

        <input
            type="text"
            class="w-full h-full bg-white/10 focus:outline-none px-6 placeholder:italic"
            {placeholder}
        />
    </div>
</main>
