import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Academic from './components/Academic';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Academic />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

export default App;
