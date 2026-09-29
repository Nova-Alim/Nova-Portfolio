import { Link } from "react-scroll";

function Navbar() {
    return (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100%-24px)]">
            <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-lg font-sans whitespace-nowrap">
                
                <Link
                    to="home"
                    className="text-sm sm:text-base hover:opacity-70 transition cursor-pointer"
                    smooth={true}
                    duration={500}
                >
                    Home
                </Link>

                <Link
                    to="stack"
                    className="text-sm sm:text-base hover:opacity-70 transition cursor-pointer"
                    smooth={true}
                    duration={500}
                >
                    Stack
                </Link>

                <Link
                    to="projects"
                    className="text-sm sm:text-base hover:opacity-70 transition cursor-pointer"
                    smooth={true}
                    duration={500}
                >
                    Projects
                </Link>

                <Link
                    to="about"
                    className="text-sm sm:text-base hover:opacity-70 transition cursor-pointer"
                    smooth={true}
                    duration={500}
                >
                    About
                </Link>

            </div>
        </div>
    );
}

export default Navbar;