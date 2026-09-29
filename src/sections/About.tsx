import { aboutMe } from "../constants/constant.tsx";
import profilePic from "../assets/profile.jpg";

function copyEmail() {
    navigator.clipboard.writeText("novalim1116@gmail.com");
    alert("Email Copied!");
}

function About() {
    return (
        <section
            id="about"
            className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-20 lg:px-0 lg:py-0"
        >

            {/* Center Divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2">

                <div className="absolute inset-0 bg-blue-400/30 blur-md animate-pulse"></div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.6)]" />

            </div>

            {/* Profile Side */}
            <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2 mb-12 lg:mb-0">

                <img
                    src={profilePic}
                    alt="Nova Alim"
                    className="h-40 w-40 sm:h-48 sm:w-48 lg:h-50 lg:w-50 object-cover object-[20%_30%] rounded-full"
                />

                <h2 className="text-2xl font-semibold">
                    Nova Alim
                </h2>

                <button
                    className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer transition-all duration-300 backdrop-blur-md"
                    onClick={copyEmail}
                >
                    Email Me
                </button>

            </div>

            {/* About Side */}
            <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2 px-2 sm:px-5 text-center">

                <h1 className="font-semibold text-4xl sm:text-5xl">
                    About Me!
                </h1>

                <div className="w-20 sm:w-30 h-[2px] bg-gray-500"></div>

                <p className="max-w-lg text-sm sm:text-base font-semibold leading-relaxed">
                    {aboutMe}
                </p>
                 <a
                  href="https://www.linkedin.com/in/nova-alim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 cursor-pointer transition-all duration-300 backdrop-blur-md"
                >
                  Connect with me
                  </a>

            </div>

        </section>
    );
}

export default About;