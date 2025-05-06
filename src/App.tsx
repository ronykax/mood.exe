import MoodSelect from "./components/MoodSelect";

import { openSettings } from "./utils";
import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

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
        })();

        setInterval(async () => {
            const theWindow = getCurrentWindow();

            if (await theWindow.isVisible()) return;

            await theWindow.show();
            await theWindow.setFocus();
        }, 10000000000);
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
