import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Stack from './sections/Stack';
import Projects from './sections/Projects';
import About from './sections/About';
import { MeteorBackground } from './components/MeteorBackground';


const App = () => {
  return(
   <div>
    <MeteorBackground/>
    <Navbar/>
    <Hero/>
    <Stack/>
    <Projects/>
    <About/>
  </div>
  );
}

export default App
