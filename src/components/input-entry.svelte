<script lang="ts">
    let { placeholder } = $props();
    import { inputStore } from "../stores/input";

    let inputEntry = $state("");
    $effect(() => inputStore.set(inputEntry));
</script>

<textarea
    class="resize-none w-full rounded-md h-full bg-black/50 focus:outline-none p-5 placeholder:italic text-xl"
    {placeholder}
    bind:value={inputEntry}
></textarea>
