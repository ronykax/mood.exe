import "./App.css";
import Navbar from "./components/Navbar";

const moods = ["😢", "😞", "😐", "🙂", "😃"] as const;

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="h-screen flex flex-col items-center justify-center">
                <span className="text-3xl">how are you feeling right now?</span>

                <div className="flex text-7xl mt-10">
                    {moods.map((emoji) => (
                        <button className="cursor-pointer">{emoji}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}
