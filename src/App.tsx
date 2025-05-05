import MoodSelect from "./components/MoodSelect";

import { openSettings } from "./utils";
import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";

export default function App() {
    async function trayIcon() {
        await TrayIcon.new({
            tooltip: "mood.exe",
            title: "Hello, world!",
            menu: await Menu.new({
                items: [
                    { id: "quit", text: "Quit" },
                    {
                        id: "settings",
                        text: "Settings",
                        action: async () => {
                            await openSettings();
                        },
                    },
                ],
            }),
            showMenuOnLeftClick: true,
        });
    }

    trayIcon();

    return <MoodSelect />;
}
