import {aboutMe} from "../constants/constant.tsx"



function copyEmail (){
navigator.clipboard.writeText("novalim1116@gmail.com");
alert("Email Copied!")
}

function About(){
    return(
    <section id="about" className="relative min-h-screen flex items-center justify-center">
        
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 ">

            <div className="absolute inset-0 bg-blue-400/30 blur-md animate-pulse"></div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.6)]" />

            <div>

            </div>
        
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4 w-1/2">
        <img
          src="src/assets/Profile Picture.JPG"
          className="h-50 w-50 object-cover object-[20%_30%] rounded-full"
        />
        <h2 className="text-2xl font-semibold">Nova Alim</h2>
        <button className="px-4 py-2 rounded-xl bg-white/10 border border-white hover:bg-white/20 cursor-pointer" onClick={copyEmail}>
          Email Me
        </button>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4 w-1/2 px-5 text-center">
            <h1 className="font-semibold text-5xl"> About Me! </h1>
            <div className= "w-30 h-[2px] bg-gray-500"></div>
            <p className="max-w-lg font-semibold"> {aboutMe}</p>
        
        </div>

            
            
    </section>
)


}
export default About