<script lang="ts">
    import {
        convertIntervalToMs,
        getMoodImages,
        getMoodName,
        loadSettings,
    } from "$lib";
    import { submitEntry } from "$lib/submit-entry";
    import { getCurrentWindow } from "@tauri-apps/api/window";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    import InputEntry from "$components/input-entry.svelte";
    import { inputStore } from "$stores/input";
    import Navbar from "$components/navbar.svelte";
    import {
        isPermissionGranted,
        requestPermission,
        sendNotification,
    } from "@tauri-apps/plugin-notification";

    import { Confetti } from "svelte-confetti";

    let showConfetti = $state(false);

    let moods = $state<string[]>([]);
    moods = getMoodImages();

    let showCloseMsg = $state(false);
    let showStartMsg = $state(true);
    onMount(() => (showStartMsg = false));

    let startAnimation = $state(false);
    onMount(() => (startAnimation = true));

    let selectedMood = $state("");
    let capturedImage = $state("");

    async function submit() {
        showCloseMsg = true;

        await submitEntry({
            capturedImage: "",
            createdAt: new Date().toISOString(),
            entry: $inputStore,
            mood: selectedMood,
        });
    }

    $effect(() => {
        if (showCloseMsg) {
            setTimeout(async () => {
                await getCurrentWindow().hide();

                // reset everything for next time
                showCloseMsg = false;
                selectedMood = "";
                selectedIndex = null;
            }, 1250);
        }
    });

    let selectedIndex = $state<number | null>(null);

    function handleClick(item: string, index: number) {
        if (index === 2) {
            // meaning "happy" is selected
            showConfetti = true;
        }

        selectedMood = getMoodName(item) || "";
        selectedIndex = index;
    }

    // start notifs
    onMount(async () => {
        // check if can send notification
        console.log("checking if permission granted");
        let permissionGranted = await isPermissionGranted();

        if (!permissionGranted) {
            console.log("permission not granted... requesting permission now");

            const permission = await requestPermission();
            permissionGranted = permission === "granted";
        }

        if (!permissionGranted) {
            console.log("permission not granted...");
            return;
        }

        const settings = await loadSettings();
        const interval = settings.interval as string;

        console.log(interval);

        const ms = convertIntervalToMs(interval);

        setInterval(() => {
            sendNotification({
                title: "how are you feeling right now?",
                body: "you've been ignoring me for some time now...",
            });
        }, ms);
    });
</script>

{#if showStartMsg}
    <div
        class="w-full h-full bg-black/50 fixed top-0 right-0 z-[50] flex justify-center items-center backdrop-blur-[16px] text-white"
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

{#if showCloseMsg}
    <div
        class="w-full h-full bg-black/50 fixed top-0 right-0 z-[50] flex justify-center items-center backdrop-blur-[16px] text-white"
        in:fade={{ duration: 500 }}
    >
        <span
            class="text-4xl font-semibold text-center leading-18"
            style="text-shadow: -4px 4px 0 black;"
            in:fade={{ duration: 500 }}
        >
            thanks for sharing :)
        </span>
    </div>
{/if}

<main
    class="flex flex-col overflow-hidden h-screen bg-gradient-to-r from-stone-500 to-stone-700 text-white"
>
    <Navbar />
    {#if showConfetti}
        <div
            class="fixed w-full h-full flex justify-center z-10 -top-[10px] pointer-events-none"
        >
            <Confetti
                x={[-5, 5]}
                y={[-2, 0.1]}
                delay={[500, 2000]}
                infinite={true}
                amount={100}
                fallDistance="100vh"
            />
        </div>
    {/if}

    <main class="w-screen h-full p-2">
        <div class="flex flex-col w-full h-full overflow-hidden gap-2">
            <div class="flex gap-2 w-full">
                {#each moods as item, index}
                    {#if !showStartMsg && startAnimation}
                        <button
                            class="w-full h-full aspect-square rounded-xl cursor-pointer relative overflow-hidden group bg-black duration-150"
                            in:fade={{
                                delay: (index + 1) * 200,
                                duration: 600,
                            }}
                            onclick={() => handleClick(item, index)}
                        >
                            <img
                                class="w-full h-full object-cover duration-150 rounded-xl {selectedIndex ===
                                    index && 'border-[4.75px]'} {index === 2
                                    ? 'border-green-400/75'
                                    : index === 1
                                      ? 'border-yellow-300/75'
                                      : index === 0 && 'border-red-500/75'}"
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
                <InputEntry
                    placeholder={"why are you feeling this way?"}
                    onClick={submit}
                />
            </div>
        </div>
    </main>
</main>
