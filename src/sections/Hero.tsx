import profilePic from "../assets/profile.jpg";

function Hero() {
    return (
        <section
            id="home"
            className="h-screen flex flex-col items-center justify-center md:flex-row gap-2 px-4"
        >
            <img
                src={profilePic}
                alt="Nova Alim"
                className="h-40 w-40 sm:h-48 sm:w-48 md:h-50 md:w-50 rounded-full object-cover object-[20%_30%] shrink-0"
            />

            <div className="flex flex-col gap-2 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold leading-tight">
                    Hi! <span className="wave">👋</span>
                    <br />
                    I'm Nova Alim
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed">
                    I'm a full stack Software Engineer with a passion for building products for form and function
                </p>
            </div>
        </section>
    );
}

export default Hero;