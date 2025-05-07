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

export function getMoodName(path: string) {
    return path.split("/").pop()?.slice(0, -7);
}