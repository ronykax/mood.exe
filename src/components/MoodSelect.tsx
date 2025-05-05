import { useState } from "react";
import { getMoodImages } from "../utils";
import Modal from "./Modal";

export default function MoodSelect() {
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            showModal && setShowModal(false);
        }
    });

    const [currentMood, setCurrentMood] = useState<string>();
    const [showModal, setShowModal] = useState(false);

    function handleClick(mood: string) {
        setCurrentMood(mood);
        setShowModal(true);
    }

    const moods = getMoodImages();

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
                        <img className="w-full h-full" src={src} alt="Mood" />

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

            {showModal && <Modal mood={currentMood!} close={() => setShowModal(false)} />}
        </div>
    );
}
