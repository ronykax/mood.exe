<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";

    let name = $state("");
    let greetMsg = $state("");

    async function greet(event: Event) {
        event.preventDefault();
        greetMsg = await invoke("greet", { name });
    }
</script>

<div>
    <form onsubmit={greet}>
        <input
            id="greet-input"
            placeholder="Enter a name..."
            bind:value={name}
        />
        <button type="submit">Greet</button>
    </form>
    <p>{greetMsg}</p>
</div>
