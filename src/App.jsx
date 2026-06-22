import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  // Ocultar el loader cuando la página terminó de cargar (con un mínimo y un tope)
  useEffect(() => {
    let timer;
    const finish = () => {
      timer = setTimeout(() => setLoading(false), 500);
    };
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }
    const maxTimer = setTimeout(() => setLoading(false), 4000);
    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(timer);
      clearTimeout(maxTimer);
    };
  }, []);

  // Animaciones de aparición: arrancan cuando termina la carga y se disparan al hacer scroll
  useEffect(() => {
    if (loading) return;
    const els = document.querySelectorAll('.reveal, .reveal-fade');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="app">
      <Loader hidden={!loading} />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

export default App;
