import MoodSelect from "./components/MoodSelect";

import { IntervalFormat, openSettings } from "./utils";
import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { load } from "@tauri-apps/plugin-store";
import { enable, isEnabled } from "@tauri-apps/plugin-autostart";

export default function App() {
    async function showWindow() {
        const visible = await getCurrentWindow().isVisible();

        if (visible) {
            await getCurrentWindow().hide();
        } else {
            await getCurrentWindow().show();
        }
    }

    useEffect(() => {
        (async () => {
            await getCurrentWindow().hide();

            const store = await load("store.json", { autoSave: false });
            const stuff = (await store.get("stuff")) as any;

            const { interval, intervalFormat, launchAtStartup } = stuff; // get interval and format like 1 hour or 30 minutes

            const formatToMs: Record<IntervalFormat, number> = {
                minutes: 60_000,
                hours: 60 * 60_000,
                days: 24 * 60 * 60_000,
                months: 30 * 24 * 60 * 60_000,
            };

            const waitTime =
                interval * formatToMs[intervalFormat as IntervalFormat]; // convert interval and format to ms

            if (!(await isEnabled())) {
                launchAtStartup && (await enable());
            }

            setInterval(async () => {
                const theWindow = getCurrentWindow();

                if (await theWindow.isVisible()) return;

                await theWindow.show();
                await theWindow.setFocus();
            }, waitTime); // prompt use to log mood
        })();
    }, []);

    async function trayIcon() {
        await TrayIcon.new({
            tooltip: "mood.exe",
            title: "Hello, world!",
            menu: await Menu.new({
                items: [
                    {
                        id: "quit",
                        text: "Quit",
                        action: async () => await getCurrentWindow().close(),
                    },
                    {
                        id: "settings",
                        text: "Settings",
                        action: async () => await openSettings(),
                    },
                    {
                        id: "log",
                        text: "Log now!",
                        action: async () => showWindow(),
                    },
                ],
            }),
            // showMenuOnLeftClick: true,
            // icon
        });
    }

    trayIcon();

    return <MoodSelect />;
}
