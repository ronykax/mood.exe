import { useEffect, useState } from "react";
import { getMoodImages } from "../utils";
import Modal from "./Modal";
import { getCurrentWindow } from "@tauri-apps/api/window";

export default function MoodSelect() {
    useEffect(() => {
        setMoods(getMoodImages());
    }, []);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                if (showModal) {
                    setShowModal(false);
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const [currentMood, setCurrentMood] = useState<string>();
    const [showModal, setShowModal] = useState(false);
    const [moods, setMoods] = useState<string[]>([]);

    function handleClick(mood: string) {
        setCurrentMood(mood);
        setShowModal(true);
    }

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    async function closeWindowAhh() {
        await getCurrentWindow().hide();
        setShowModal(false);
    }

    return (
        <div className="w-full h-screen">
            <div className="grid grid-cols-2 w-full h-full bg-black">
                {moods.map((src, i) => (
                    <button
                        key={i}
                        onClick={() =>
                            handleClick(src.split("/").pop()?.slice(0, -7)!)
                        }
                        className={`cursor-pointer relative group`}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            className="w-full h-full aspect-square"
                            src={src}
                            alt="Mood"
                        />

                        <div
                            className={`absolute w-full h-full top-0 right-0 transition-colors duration-200 ${
                                hoveredIndex === null || hoveredIndex === i
                                    ? "bg-black/0"
                                    : "bg-black/75 backdrop-blur-[8px]"
                            }`}
                        >
                            <span
                                style={{ textShadow: "2px 2px 0 black" }}
                                className="w-full h-full flex justify-center items-center text-2xl font-semibold text-white opacity-0 group-hover:opacity-100"
                            >
                                {src.split("/").pop()?.slice(0, -7)}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {showModal && <Modal mood={currentMood!} close={closeWindowAhh} />}
        </div>
    );
}
