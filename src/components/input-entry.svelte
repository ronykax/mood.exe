<script lang="ts">
    interface Props {
        placeholder: string;
        mood: string;
        onClick: () => void;
    }

    let { placeholder, mood, onClick }: Props = $props();
    import { inputStore } from "../stores/input";

    let inputEntry = $state("");
    $effect(() => inputStore.set(inputEntry));

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevent new line
            onClick(); // trigger submit
        }
    }
</script>

<textarea
    class="resize-none w-full rounded-md h-full bg-black/50 focus:outline-none p-5 placeholder:italic text-xl"
    {placeholder}
    bind:value={inputEntry}
    onkeydown={handleKeyDown}
></textarea>
