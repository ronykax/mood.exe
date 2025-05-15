<script lang="ts">
    import { getCurrentWindow } from "@tauri-apps/api/window";

    async function closeWindow() {
        await getCurrentWindow().hide();
    }
</script>

<div
    data-tauri-drag-region
    class="flex w-screen p-2 bg-black/50 justify-between items-center"
>
    <span class="text-white/50 font-semibold text-lg">🐈 mood.exe</span>

    <button
        class="text-white/50 p-1 bg-white/8 rounded-md cursor-pointer"
        onclick={closeWindow}
    >
        ❌
    </button>
</div>
