import WindowClose from "../icons/WindowClose";

export default function Navbar() {
    return (
        <div
            data-tauri-drag-region
            className="bg-white/5 border-b border-[#3f3f3f] flex justify-between"
        >
            <div className="px-2.5 py-1">
                <span className="text-lg opacity-75">mood.exe</span>
            </div>

            <button className="cursor-pointer h-full aspect-square hover:bg-red-600">
                <span className="opacity-75 flex justify-center items-center">
                    <WindowClose />
                </span>
            </button>
        </div>
    );
}
