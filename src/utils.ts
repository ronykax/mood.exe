import { invoke } from "@tauri-apps/api/core";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import {
    BaseDirectory,
    create,
    exists,
    open,
    readFile,
    writeFile,
} from "@tauri-apps/plugin-fs";
import { load } from "@tauri-apps/plugin-store";

export function getMoodImages(): string[] {
    const moods = ["stressed", "sad", "calm", "happy"] as const;
    const assets = import.meta.glob("/src/assets/moods/*.{png,gif}", {
        eager: true,
        import: "default",
    });

    const files = Object.entries(assets); // [path, imported image src]
    const result: string[] = [];

    for (const mood of moods) {
        const matching = files.filter(([path]) =>
            path.includes(`/moods/${mood}`)
        );
        if (matching.length === 0) continue;

        const [_, imageSrc] =
            matching[Math.floor(Math.random() * matching.length)];

        result.push(imageSrc as string);
    }

    return result;
}

export async function getThatJsonFile() {
    const relativePath = "mood-exe\\data.json";

    const fileExists = await exists(relativePath, {
        baseDir: BaseDirectory.Document,
    });

    if (!fileExists) {
        const newFile = await create(relativePath, {
            baseDir: BaseDirectory.Document,
        });

        await newFile.write(new TextEncoder().encode("[]")); // empty JSON array
        await newFile.close();
    }

    const file = await open(relativePath, {
        baseDir: BaseDirectory.Document,
        write: true,
        read: true,
    });

    return file;
}

export async function addMoodEntry(entry: {
    createdAt: string;
    mood: string;
    entry: string;
}) {
    const store = await load("store.json", { autoSave: false });
    const jsonPath = (await store.get("jsonPath")) as string;

    interface MoodEntry {
        createdAt: string;
        mood: string;
        entry: string;
    }

    const read = await readFile(jsonPath);
    const contents = new TextDecoder().decode(read);
    const parsed: MoodEntry[] = JSON.parse(contents);

    parsed.push(entry);

    const toWrite = new TextEncoder().encode(JSON.stringify(parsed));
    await writeFile(jsonPath, toWrite);

    // try {
    //     data = JSON.parse("");
    //     if (!Array.isArray(data)) data = [];
    // } catch {
    //     data = [];
    // }

    // data.push(entry);
}

export async function openSettings() {
    new WebviewWindow("settings", {
        center: true,
        url: "/settings",
        width: 400,
        height: 500,
        decorations: false,
    });
}
