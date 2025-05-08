<script lang="ts">
    import { getMoodImages, getMoodName } from "$lib";
    import { submitEntry } from "$lib/submit-entry";
    import { hide } from "@tauri-apps/api/app";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let moods = $state<string[]>([]);
    moods = getMoodImages();

    let showStartMsg = $state(true);
    onMount(() => (showStartMsg = false));

    let placeholder = $state("how are you feeling right now?");

    let startAnimation = $state(false);
    onMount(() => (startAnimation = true));

    let selectedMood = $state("");
    let inputEntry = $state("");
    let capturedImage = $state("");

    async function submit() {
        await submitEntry({
            capturedImage: "",
            createdAt: new Date().toISOString(),
            entry: inputEntry,
            mood: selectedMood,
        });

        // hide window
        await hide();
    }

    let selectedIndex = $state<number | null>(null);

    function handleClick(item: string, index: number) {
        selectedMood = getMoodName(item) || "";
        selectedIndex = index;
    }
</script>

<main
    class="w-screen h-screen text-white p-2 bg-gradient-to-r from-stone-500 to-stone-700"
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

    <div class="flex flex-col w-full h-full overflow-hidden gap-2">
        <div class="flex gap-2 w-full">
            {#each moods as item, index}
                {#if !showStartMsg && startAnimation}
                    <button
                        class="w-full h-full aspect-square rounded-xl cursor-pointer relative overflow-hidden group bg-black duration-200 {selectedIndex === index && 'border-[8px]'} {index === 2
                            ? 'border-green-400/50'
                            : index === 1
                              ? 'border-yellow-300/50'
                              : index === 0 && 'border-red-500/50'}"
                        in:fade={{ delay: (index + 1) * 200, duration: 600 }}
                        onclick={() => handleClick(item, index)}
                    >
                        <img
                            class="w-full h-full object-cover group-hover:scale-[112%] duration-150"
                            src={item}
                            alt={item}
                            draggable="false"
                        />

                        <div
                            class={`w-full h-full absolute top-0 right-0 flex justify-center items-center opacity-0 ${selectedIndex !== index && "group-hover:opacity-100 group-hover:bg-black/65 group-hover:backdrop-blur-xs"} duration-150 ${selectedIndex === null || selectedIndex === index ? "opacity-0" : "opacity-100 bg-black/65 backdrop-blur-xs"}`}
                        >
                            <span
                                class="text-4xl font-semibold"
                                style="text-shadow: -4px 4px 0 black;"
                            >
                                {getMoodName(item)}
                            </span>
                        </div>
                    </button>
                {/if}
            {/each}
        </div>

        <div class="flex w-full h-full">
            <!-- <input
                type="text"
                class="w-full h-full focus:outline-none px-6 placeholder:italic"
                {placeholder}
                bind:value={inputEntry}
            /> -->

            <textarea
                class="resize-none w-full rounded-md h-full bg-black/50 focus:outline-none p-5 placeholder:italic text-xl"
                {placeholder}
                bind:value={inputEntry}
            ></textarea>

            <!-- <button class="px-4 cursor-pointer" onclick={submit}>✅</button> -->
        </div>
    </div>
</main>
