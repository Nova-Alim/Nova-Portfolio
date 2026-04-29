import {Link} from 'react-scroll'


function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-lg font-sans">
        <Link to='home' className="hover:opacity-70 transition cursor-pointer" smooth={true} duration={500}> Home</Link>
        <Link to='stack' className="hover:opacity-70 transition cursor-pointer" smooth={true} duration={500}> Stack</Link>
        <Link to='projects' className="hover:opacity-70 transition cursor-pointer" smooth={true} duration={500}> Projects</Link>
        <Link to='about' className="hover:opacity-70 transition cursor-pointer" smooth={true} duration={500}> About</Link>

      </div>
    </div>
  )
}

export default Navbar