
function Hero() {


return(
    <section id="home" className="h-screen flex flex-col items-center justify-center md:flex-row gap-2">
        
        <img src="src\assets\Profile Picture.JPG" 
            className="h-50 w-50 rounded-full object-cover object-[20%_30%]"/>
        <div className="flex flex-col gap-2 text-left"> 
            <h1 className="text-5xl font-bold leading-tight ">Hi! <span className="wave">👋</span> <br />I'm Nova Alim</h1>
            <p className="text-2xl font-semibold">Im a full stack Software Engineer with a passion for building products for form and function</p>
        </div>
    </section>
)
};

export default Hero