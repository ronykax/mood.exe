<script lang="ts">
    import Navbar from "$components/navbar.svelte";
    import { getAllEntries } from "$lib/get-all-entries";
    import { onMount } from "svelte";
    import {
        Chart,
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
    } from "chart.js";

    let entries = $state<MoodEntry[]>([]);

    onMount(async () => {
        entries = (await getAllEntries()).reverse();
    });

    let ctx: HTMLCanvasElement | null = null;

    onMount(() => {
        if (!ctx) return;

        Chart.register(
            BarController,
            BarElement,
            CategoryScale,
            LinearScale,
            Tooltip,
            Legend
        );

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [12, 19, 3, 5, 2, 3],
                        borderWidth: 1,
                    },
                ],
            },
        });
    });
</script>

<div
    class="bg-gradient-to-r from-stone-500 to-stone-700 w-screen h-screen overflow-hidden"
>
    <Navbar closeable />

    <div class="p-2 flex">
        <!-- <div
            class="p-2 flex flex-col gap-2 h-[calc(100vh-4rem)] overflow-y-auto w-full"
        >
            {#each entries as item}
                <div
                    class="bg-black/25 rounded-md p-4 text-white hover:bg-black/35 duration-150 cursor-pointer"
                >
                    <pre
                        class="whitespace-pre-wrap break-words">{JSON.stringify(
                            item,
                            null,
                            2
                        )}</pre>
                </div>
            {/each}
        </div> -->

        <div class="w-full">
            <canvas bind:this={ctx}></canvas>
        </div>
    </div>
</div>
