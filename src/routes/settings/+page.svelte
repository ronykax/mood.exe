<script lang="ts">
    import { getCurrentWindow } from "@tauri-apps/api/window";
    import { exists } from "@tauri-apps/plugin-fs";
    import { load } from "@tauri-apps/plugin-store";
    import { onMount } from "svelte";

    let jsonPath = $state("");

    // load settings
    onMount(async () => {
        const store = await load("settings.json", { autoSave: false });
        jsonPath = (await store.get("jsonPath")) || "";
    });

    async function handleApply() {
        if (!jsonPath.endsWith(".json")) {
            console.log("provide a json file!");
            return;
        }

        if (!(await exists(jsonPath))) {
            console.log("invalid file path");
            return;
        }

        const store = await load("settings.json", { autoSave: false });

        await store.set("jsonPath", jsonPath);
        await store.save();

        console.log("saved!");
    }

    async function handleClose() {
        await getCurrentWindow().close();
    }
</script>

<div class="bg-black/90 w-screen h-screen p-4 text-white">
    <div class="flex flex-col gap-4 w-full h-full">
        <!-- inputs -->
        <div class="h-full flex flex-col gap-4">
            <label class="flex flex-col gap-2">
                <span class="text-sm font-semibold opacity-75">
                    JSON File Path
                </span>
                <input
                    type="text"
                    class="p-2 border rounded-md border-white/25 w-full"
                    placeholder="C:\Users\Rony\Documents\mood.json"
                    bind:value={jsonPath}
                />
            </label>

            <label class="flex flex-col gap-2">
                <span class="text-sm font-semibold opacity-75">Interval</span>
                <div class="flex gap-2">
                    <input
                        type="number"
                        class="p-2 border rounded-md border-white/25 w-full"
                        placeholder="24"
                    />

                    <select
                        class="p-2 border rounded-md border-white/25 w-[40%]"
                    >
                        <option class="bg-black/85" value="minutes"
                            >Minutes</option
                        >
                        <option class="bg-black/85" value="hours">Hours</option>
                        <option class="bg-black/85" value="days">Days</option>
                        <option class="bg-black/85" value="months"
                            >Months</option
                        >
                    </select>
                </div>
            </label>

            <label class="flex items-center gap-2">
                <input type="checkbox" />
                <span>Launch At Startup</span>
            </label>
        </div>

        <!-- buttons -->
        <div class="flex gap-2">
            <button
                class="px-4 py-2 bg-green-400/20 rounded-md w-full cursor-pointer hover:bg-green-400/30"
                onclick={handleApply}
            >
                Apply
            </button>
            <button
                class="px-4 py-2 bg-red-500/25 rounded-md w-full cursor-pointer hover:bg-red-500/35"
                onclick={handleClose}
            >
                Close
            </button>
        </div>
    </div>
</div>
