<script lang="ts">
    import { getCurrentWindow } from "@tauri-apps/api/window";
    import { exists } from "@tauri-apps/plugin-fs";
    import { load } from "@tauri-apps/plugin-store";
    import { onMount } from "svelte";

    let jsonPath = $state("");
    let interval = $state("");

    // load settings
    onMount(async () => {
        const store = await load("settings.json", { autoSave: false });

        jsonPath = (await store.get("jsonPath")) || "";
        interval = (await store.get("interval")) || "";
    });

    async function handleApply() {
        if (!jsonPath.endsWith(".json")) {
            console.log("provide a json file!");
            return;
        }

        if (!(await exists(jsonPath))) {
            console.log("invalid file path!");
            return;
        }

        // remove "s" in prod
        if (!["d", "h", "m", "s"].some((unit) => interval.endsWith(unit))) {
            console.log("invalid interval!");
            return;
        }

        const store = await load("settings.json", { autoSave: false });

        await store.set("jsonPath", jsonPath);
        await store.set("interval", interval);

        await store.save();

        // console.log("saved!");
        await getCurrentWindow().close();
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
                <input
                    type="text"
                    class="p-2 border rounded-md border-white/25 w-full"
                    placeholder="24"
                    bind:value={interval}
                />
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
