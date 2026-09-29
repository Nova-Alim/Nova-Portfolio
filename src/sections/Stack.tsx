export const tagstyle =
    "px-3 py-1 text-sm bg-white/5 rounded-full font-semibold hover:bg-white/10 border border-white/10 transition-all duration-300";

function Stack() {
    return (
        <section
            id="stack"
            className="min-h-screen px-5 sm:px-8 py-20 text-white flex items-center justify-center"
        >
            <div
                id="container"
                className="w-full max-w-6xl mx-auto py-10 sm:py-20"
            >
                <h2 className="text-2xl sm:text-3xl tracking-widest text-gray-400 font-semibold">
                    Tech Stack
                </h2>

                <div className="w-20 sm:w-30 h-[2px] bg-gray-500 mt-2 mb-10"></div>

                <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">

                    {/* Languages */}
                    <div>
                        <h1 className="text-xs text-gray-500 mb-4">
                            LANGUAGES
                        </h1>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className={tagstyle}>Javascript</span>
                            <span className={tagstyle}>Java</span>
                            <span className={tagstyle}>Python</span>
                            <span className={tagstyle}>C++</span>
                            <span className={tagstyle}>Kotlin</span>
                            <span className={tagstyle}>TypeScript</span>
                        </div>
                    </div>

                    {/* Frameworks */}
                    <div>
                        <h1 className="text-xs text-gray-500 mb-4">
                            FRAMEWORKS
                        </h1>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className={tagstyle}>React</span>
                            <span className={tagstyle}>Vue</span>
                            <span className={tagstyle}>Next.js</span>
                            <span className={tagstyle}>TailwindCSS</span>
                        </div>
                    </div>

                    {/* Databases */}
                    <div>
                        <h1 className="text-xs text-gray-500 mb-4">
                            DATABASES
                        </h1>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className={tagstyle}>PostgreSQL</span>
                            <span className={tagstyle}>MySQL</span>
                            <span className={tagstyle}>MongoDB</span>
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <h1 className="text-xs text-gray-500 mb-4">
                            TOOLS
                        </h1>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className={tagstyle}>Git</span>
                            <span className={tagstyle}>Unix/Linux</span>
                            <span className={tagstyle}>VS Code</span>
                            <span className={tagstyle}>IntelliJ</span>
                            <span className={tagstyle}>Postman</span>
                            <span className={tagstyle}>Railway</span>
                            <span className={tagstyle}>Netlify</span>
                            <span className={tagstyle}>Mockito</span>
                            <span className={tagstyle}>JUnit</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Stack;