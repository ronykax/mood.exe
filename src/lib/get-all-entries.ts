import { readFile } from "@tauri-apps/plugin-fs";
import { load } from "@tauri-apps/plugin-store";

export async function getAllEntries() {
    const store = await load("settings.json", { autoSave: false });
    const jsonPath = (await store.get("jsonPath")) as string;
    const contents = new TextDecoder().decode(await readFile(jsonPath));

    const data: MoodEntry[] = JSON.parse(contents) as MoodEntry[];

    return data;
}
