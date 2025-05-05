import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { exists } from "@tauri-apps/plugin-fs";

import { load } from "@tauri-apps/plugin-store";
// import { platform } from "@tauri-apps/plugin-os"; // delete this package later

export default function Settings() {
    const [jsonPath, setJsonPath] = useState("");

    useEffect(() => {
        async function yes() {
            const store = await load("store.json", { autoSave: false });
            const path = await store.get("jsonPath") as string;
            
            setJsonPath(path);
        }

        yes();
    }, []);

    const handleApply = async () => {
        const fileExists = await exists(jsonPath);

        if (!fileExists) {
            console.error("JSON file path doesn't exist!");
            return;
        }

        const store = await load("store.json", { autoSave: false });

        await store.set("jsonPath", jsonPath);

        await store.save();
        console.log("Saved!");

        // const contents = await readFile(jsonPath);
        // const jsonString = new TextDecoder().decode(contents);

        // const acutalJson: MoodEntry[] = JSON.parse(jsonString);

        // console.log(acutalJson);
    };

    return (
        <div className="bg-gray-900 h-screen flex flex-col justify-between">
            <div className="p-4">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold opacity-75">
                        Path to JSON file
                    </span>
                    <input
                        type="text"
                        placeholder="C:/Users/Rony/Documents/Cloud/mood.json"
                        className="p-2 border rounded-md border-white/50 w-full"
                        value={jsonPath}
                        onChange={(e) => setJsonPath(e.target.value)}
                    />
                </label>
            </div>

            <div className="flex p-4 w-full gap-2">
                <button
                    className="w-full px-4 py-3 bg-green-400/25 rounded-md cursor-pointer"
                    onClick={handleApply}
                >
                    Apply
                </button>

                <button
                    className="w-full px-4 py-3 bg-red-400/30 rounded-md cursor-pointer"
                    onClick={() => getCurrentWindow().close()}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
