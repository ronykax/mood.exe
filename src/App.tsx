import "./App.css";

export default function App() {
    interface Mood {
        emoji: string;
        color: string;
    }

    type MoodGroup = Mood[][];

    const moodGroup: MoodGroup = [
        [
            { emoji: "😞", color: "#fb2c36" },
            { emoji: "😐", color: "#ffdf20" },
            { emoji: "🙂", color: "#7bf1a8" },
            { emoji: "😃", color: "#51a2ff" },
        ],
    ];

    const moods = moodGroup[Math.floor(Math.random() * moodGroup.length)];

    return (
        <div className="grid grid-cols-2 text-6xl w-full h-screen bg-black">
            {moods.map(({ emoji, color }) => (
                <button
                    key={emoji}
                    className={`cursor-pointer relative group`}
                    style={{
                        background: `radial-gradient(circle, ${color}ff 25%, #000 200%)`,
                    }}
                >
                    <div className={`p-2 w-fit mx-auto ${color} rounded-full`}>
                        {emoji}
                    </div>

                    <div className="animated-border absolute w-full h-full top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                </button>
            ))}
        </div>
    );
}
