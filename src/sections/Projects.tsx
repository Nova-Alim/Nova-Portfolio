import { useState } from "react";
import {  projects } from "../constants/constant";
import { tagstyle }  from "./Stack.tsx"

function Projects(){

    const [currentIndex, setCurrentIndex] = useState(0);
    const slides= projects;

    function prevClick(){
        if(currentIndex<=0){
            setCurrentIndex(0)
        }else{
         setCurrentIndex((prev)=>(prev-1) % slides.length)}
    };

    function nextClick(){
         setCurrentIndex((prev)=>(prev+1) % slides.length)
    };

    return(
        <section id="projects" className="min-h-screen flex items-center justify-center gap-2">
                <button onClick={prevClick} className={tagstyle}>Prev</button>
                <div className="w-7xl  p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md gap-6">
                    <h1 className="text-5xl font-semibold leading-tight mb-5 text-center">{slides[currentIndex].title}</h1>
                   <img className="w-7xl mx-auto" src={slides[currentIndex].image}/>
                   <p className="mt-6">{slides[currentIndex].text}</p>
                    </div>
                <button onClick={nextClick} className={tagstyle}>Next</button>
        </section>

    )

}

export default Projects