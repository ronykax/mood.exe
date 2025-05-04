import { useEffect, useState } from "react";
import "./App.css";

import { TrayIcon } from "@tauri-apps/api/tray";
import Modal from "./components/Modal";
import { getMoodImages } from "./utils";
import { Menu } from "@tauri-apps/api/menu";

export default function App() {
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            showModal && setShowModal(false);
        }
    });

    useEffect(() => {
        async function trayIcon() {
            await TrayIcon.new({
                tooltip: "mood.exe",
                title: "Hello, world!",
                menu: await Menu.new({
                    items: [
                        { id: "quit", text: "Quit" },
                        { id: "settings", text: "Settings" },
                    ],
                }),
                showMenuOnLeftClick: true,
            });
        }

        trayIcon();
    }, []);

    const [currentMood, setCurrentMood] = useState<string>();
    const [showModal, setShowModal] = useState(false);

    function handleClick(mood: string) {
        setCurrentMood(mood);
        setShowModal(true);
    }

    const moods = getMoodImages();

    console.log(moods);

    return (
        <div className="w-full h-screen relative">
            <div className="grid grid-cols-2 w-full h-full bg-black">
                {moods.map((src, i) => (
                    <button
                        key={i}
                        onClick={() =>
                            handleClick(src.split("/").pop()?.slice(0, -7)!)
                        }
                        className={`cursor-pointer relative group`}
                    >
                        <img className="w-full h-full" src={src} alt="Mood" />

                        <div className="border-[16px] border-white/25 absolute w-full h-full top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/0 group-hover:bg-black/65 flex items-center justify-center backdrop-blur-[10px]">
                            <span className="text-2xl font-semibold text-white">
                                {src.split("/").pop()?.slice(0, -7)}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {showModal && <Modal mood={currentMood!} />}
        </div>
    );
}
