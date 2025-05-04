import {
    BaseDirectory,
    create,
    exists,
    open,
    readTextFile,
    writeTextFile,
} from "@tauri-apps/plugin-fs";

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
    const filePath = "mood-exe\\data.json";

    let data: any[] = [];

    const fileExists = await exists(filePath, {
        baseDir: BaseDirectory.Document,
    });

    if (fileExists) {
        try {
            const content = await readTextFile(filePath, {
                baseDir: BaseDirectory.Document,
            });
            data = JSON.parse(content);
            if (!Array.isArray(data)) data = [];
        } catch {
            data = [];
        }
    }

    data.push(entry);

    await writeTextFile(filePath, JSON.stringify(data, null, 2), {
        baseDir: BaseDirectory.Document,
    });
}
