import { useEffect, useState } from "react";

type Meteor = {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  animationDuration: number;
};

export const MeteorBackground = () => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [stars, setStars] = useState<Meteor[]>([]);

    const generateMeteors = () => {
        const numberOfMeteors= 4;
        const newMeteors = [];
        
        

        for (let i=0; i<numberOfMeteors; i++){
                newMeteors.push({
                    id:i,
                    size: Math.random() * 2 +1,
                    x: Math.random() *100,
                    y: Math.random() *20,
                    delay: Math.random() * 15,
                    animationDuration: Math.random() * 3 + 3,
                });
        } setMeteors(newMeteors)
 };

      const generateStars = () => {
        const numberOfStars= Math.floor(window.innerWidth * window.innerHeight / 10000 );
        const newStars = [];
        
        

        for (let i=0; i<numberOfStars; i++){
                newStars.push({
                    id:i,
                    size: Math.random() * 3 +1,
                    x: Math.random() *100,
                    y: Math.random() *100,
                    delay: Math.random() * 15,
                    animationDuration: Math.random() * 4 + 2,
                });
        } setStars(newStars)
 };


        useEffect(()=> {
            generateMeteors()
            generateStars()
        }, [])
 
        return ( <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {meteors.map((meteor)=>(
            <div key={meteor.id} className="meteor animate-meteor" style={{
              width: meteor.size *50 +"px",
              height: meteor.size * 2 +"px",
              left: meteor.x + "%",
              top: meteor.y + "%",
              animationDuration: meteor.animationDuration + "s",
            }}/>
          ))}

          {stars.map((star)=>(
            <div key={star.id} className="star animate-pulse" style={{
              width: star.size +"px",
              height: star.size  +"px",
              left: star.x + "%",
              top: star.y + "%",
              animationDuration: star.animationDuration + "s",
            }}/>
          ))}
    
    
    </div> )

 
}

export default MeteorBackground

