import { useEffect, useRef } from "react";

export default function Modal() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            console.log("Submitted:", textareaRef.current?.value);
        }
    };

    return (
        <div className="w-full h-full bg-black/75 fixed top-0 right-0 backdrop-blur-xl">
            <div className="flex flex-col h-full p-4 gap-4 items-center">
                <textarea
                    ref={textareaRef}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full bg-white/10 rounded-md resize-none p-4 text-xl"
                    placeholder="spill the tea if you must"
                />

                <div className="opacity-75 font-extralight text-xs flex justify-between w-full">
                    <span>
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    <span>
                        press{" "}
                        <span className="font-mono bg-white/20 rounded-xs px-0.5">
                            enter
                        </span>{" "}
                        to skip or submit
                    </span>
                </div>
            </div>
        </div>
    );
}
