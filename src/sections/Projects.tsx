import { useState } from "react";
import { projects } from "../constants/constant";

function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    const slides = projects;

    function changeSlide(newIndex: number) {
        setIsChanging(true);

        setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsChanging(false);
        }, 200);
    }

    function prevClick() {
        const newIndex =
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1;

        changeSlide(newIndex);
    }

    function nextClick() {
        const newIndex = (currentIndex + 1) % slides.length;

        changeSlide(newIndex);
    }

    return (
        <section
            id="projects"
            className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
        >
            <h2 className="text-5xl font-bold mb-12">
                Projects
            </h2>

            <div className="w-full max-w-6xl flex items-center gap-6">

                {/* Previous Button */}
                <button
                    onClick={prevClick}
                    className="shrink-0 w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 text-xl shadow-lg"
                >
                    ←
                </button>

                {/* Project Card */}
                <div
                    className={`flex-1 h-[650px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-500 ${
                        isChanging
                            ? "opacity-40 scale-[0.98] blur-[2px]"
                            : "opacity-100 scale-100 blur-0"
                    }`}
                >

                    {/* Project Images */}
                    <div className="h-[420px] w-full flex items-center justify-center gap-8 bg-black/20 overflow-hidden p-8">

                        {slides[currentIndex].images ? (
                            slides[currentIndex].images.map(
                                (image: string, index: number) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${slides[currentIndex].title} screen ${index + 1}`}
                                        className="h-full max-w-[45%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.03]"
                                    />
                                )
                            )
                        ) : (
                            <img
                                src={slides[currentIndex].image}
                                alt={slides[currentIndex].title}
                                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                            />
                        )}

                    </div>

                    {/* Project Information */}
                    <div className="h-[230px] p-8 flex flex-col justify-center border-t border-white/10 bg-white/[0.02]">

                        <h3 className="text-3xl font-semibold mb-4">
                            {slides[currentIndex].title}
                        </h3>

                        <p className="text-white/60 leading-relaxed">
                            {slides[currentIndex].text}
                        </p>

                    </div>

                </div>

                {/* Next Button */}
                <button
                    onClick={nextClick}
                    className="shrink-0 w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 text-xl shadow-lg"
                >
                    →
                </button>

            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => changeSlide(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            index === currentIndex
                                ? "w-8 bg-white shadow-lg"
                                : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Projects;