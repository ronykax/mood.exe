import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { exists } from "@tauri-apps/plugin-fs";

import { load } from "@tauri-apps/plugin-store";
// import { platform } from "@tauri-apps/plugin-os"; // delete this package later

export default function Settings() {
    const [jsonPath, setJsonPath] = useState("");
    const [interval, setInterval] = useState(0);

    type IntervalFormat = "minutes" | "hours" | "days" | "months";
    const [intervalFormat, setIntervalFormat] =
        useState<IntervalFormat>("minutes");

    const [launchAtStartup, setLaunchAtStartup] = useState(false);
    const [sendNotifications, setSendNotifications] = useState(false);

    // const [settings, setSettings] = useState<{
    //     jsonPath: string;
    //     interval: string;
    //     intervalFormat: string;
    //     launchAtStartup: boolean;
    //     sendNotifications: boolean;
    // }>();

    useEffect(() => {
        async function yes() {
            try {
                const store = await load("store.json", { autoSave: false });
                const stuff = (await store.get("stuff")) as any;

                console.log(stuff);

                setJsonPath(stuff.jsonPath);
                setInterval(stuff.interval);
                setIntervalFormat(stuff.intervalFormat);
                setLaunchAtStartup(stuff.launchAtStartup);
                setSendNotifications(stuff.sendNotifications);
            } catch {
                setJsonPath("");
                setInterval(2);
                setIntervalFormat("hours");
                setLaunchAtStartup(true);
                setSendNotifications(true);
            }
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

        // await store.set("jsonPath", jsonPath);
        await store.set("stuff", {
            jsonPath,
            interval,
            intervalFormat,
            launchAtStartup,
            sendNotifications,
        });

        await store.save();
        console.log("Saved!");

        await closeWindow();
    };

    async function closeWindow() {
        await getCurrentWindow().close();
    }

    return (
        <div className="bg-gray-900 h-screen flex flex-col justify-between">
            <div className="p-4 flex flex-col gap-4">
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

                <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold opacity-75">
                        Interval
                    </span>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="24"
                            className="p-2 border rounded-md border-white/50 w-full"
                            value={interval}
                            onChange={(e) =>
                                setInterval(e.target.value as unknown as number)
                            }
                        />

                        <select
                            className="p-2 border rounded-md border-white/50 w-[40%]"
                            onChange={(e) =>
                                setIntervalFormat(
                                    e.target.value as IntervalFormat
                                )
                            }
                            value={intervalFormat}
                        >
                            <option className="bg-gray-800" value="min">
                                Minutes
                            </option>
                            <option className="bg-gray-800" value="hrs">
                                Hours
                            </option>
                            <option className="bg-gray-800" value="day">
                                Days
                            </option>
                            <option className="bg-gray-800" value="mth">
                                Months
                            </option>
                        </select>
                    </div>
                </label>

                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={launchAtStartup}
                        onChange={(e) => setLaunchAtStartup(e.target.checked)}
                    />
                    <span className="text-sm font-semibold opacity-75">
                        Launch At Startup?
                    </span>
                </label>

                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={sendNotifications}
                        onChange={(e) => setSendNotifications(e.target.checked)}
                    />
                    <span className="text-sm font-semibold opacity-75">
                        Send Notifications?
                    </span>
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
                    onClick={closeWindow}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
