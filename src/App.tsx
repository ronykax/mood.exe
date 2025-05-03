import { useEffect, useState } from "react";
import "./App.css";

import {
    isPermissionGranted,
    requestPermission,
} from "@tauri-apps/plugin-notification";

import { TrayIcon } from "@tauri-apps/api/tray";
import Modal from "./components/Modal";
import { getMoodImages } from "./utils";

export default function App() {
    const [pumpNotifications, shouldPumpNotifications] = useState(false);

    useEffect(() => {
        async function shortcuts() {
            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    showModal && setShowModal(false);
                }
            });
        }

        async function trayIcon() {
            await TrayIcon.new({
                tooltip: "hi world!",
                title: "Hello, world!",
            });
        }

        async function notifications() {
            const granted = await isPermissionGranted();

            if (granted) {
                shouldPumpNotifications(true);
            } else {
                const req = await requestPermission();

                if (req === "granted") {
                    shouldPumpNotifications(true);
                }
            }
        }

        notifications();
        trayIcon();
        shortcuts();
    }, []);

    useEffect(() => {
        // setInterval(async () => {
        // }, 5000);
        // if (pumpNotifications) {
        //     sendNotification({ title: "mood.exe", body: "hi world!" });
        // }
    }, [pumpNotifications]);

    const [showModal, setShowModal] = useState(false);

    function handleClick() {
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
                        onClick={handleClick}
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

            {showModal && (
                <Modal />
            )}
        </div>
    );
}
