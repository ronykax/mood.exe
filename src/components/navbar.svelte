<script lang="ts">
    import { getCurrentWindow } from "@tauri-apps/api/window";
    import Icon from "@iconify/svelte";

    async function closeWindow() {
        await getCurrentWindow().hide();
    }

    async function minimizeWindow() {
        await getCurrentWindow().minimize();
    }
</script>

<div
    data-tauri-drag-region
    class="flex w-screen p-2 bg-black/50 justify-between items-center"
>
    <span class="text-white/50 font-semibold text-lg">🐈 mood.exe</span>

    <div class="flex gap-2">
        <button
            class="text-white/50 p-1 bg-emerald-400/15 rounded-md cursor-pointer hover:bg-emerald-400/20"
            onclick={minimizeWindow}
        >
            <Icon icon="mdi:minimize" width="24" height="24" />
        </button>

        <button
            class="text-white/50 p-1 bg-red-400/20 rounded-md cursor-pointer hover:bg-red-400/25"
            onclick={closeWindow}
        >
            <Icon icon="mdi:close" width="24" height="24" />
            <!-- ❌ -->
        </button>
    </div>
</div>
