import { readFile, writeFile } from "@tauri-apps/plugin-fs";
import { load } from "@tauri-apps/plugin-store";

interface Props {
    createdAt: string;
    entry: string;
    mood: string;
    capturedImage: string;
}

export async function submitEntry(props: Props) {
    const store = await load("settings.json", { autoSave: false });
    const jsonPath = (await store.get("jsonPath")) as string;
    const contents = new TextDecoder().decode(await readFile(jsonPath));

    const data: Props[] = JSON.parse(contents) as Props[];

    data.push({
        capturedImage: props.capturedImage,
        createdAt: props.createdAt,
        entry: props.entry,
        mood: props.mood,
    });

    await writeFile(jsonPath, new TextEncoder().encode(JSON.stringify(data)));
}
