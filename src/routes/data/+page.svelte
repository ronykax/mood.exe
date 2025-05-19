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
            options: {
                borderColor: "black",
                color: "black",
            },
        });
    });
</script>

<div
    class="bg-gradient-to-r from-stone-500 to-stone-700 w-screen h-screen overflow-hidden"
>
    <Navbar closeable />

    <div class="p-2 flex gap-2">
        <div
            class="flex flex-col gap-2 h-[calc(100vh-4rem)] overflow-y-auto w-full"
        >
            {#each entries as item}
                <div
                    class="bg-black/25 rounded-md p-4 text-white hover:bg-black/35 duration-150 cursor-pointer flex flex-col gap-2"
                >
                    <!-- <pre
                        class="whitespace-pre-wrap break-words">{JSON.stringify(
                            item,
                            null,
                            2
                        )}</pre> -->

                    <span class="text-xl font-semibold">
                        {item.entry}
                    </span>

                    <div class="flex gap-2 opacity-50">
                        <span class="">{item.mood}</span>
                        <span>•</span>
                        <span class=""
                            >{new Date(item.createdAt).toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}</span
                        >
                    </div>
                </div>
            {/each}
        </div>

        <div class="flex flex-col gap-2">
            <div class="w-[450px] bg-black/25 p-4 rounded-md">
                <canvas bind:this={ctx}></canvas>
            </div>

            <div class="h-full bg-black/25 rounded-md flex flex-col justify-center items-center text-white opacity-75 italic">feature coming soon...</div>
        </div>
    </div>
</div>
