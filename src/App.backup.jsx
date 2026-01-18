import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
