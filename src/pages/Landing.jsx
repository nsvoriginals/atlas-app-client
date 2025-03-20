import React, { useEffect, useRef } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import { Desc } from '../components/Desc';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';

function Landing() {
  const trailCount = 5;
  const dots = useRef(
    Array(trailCount).fill({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  );
  const dotRefs = useRef([]);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      dots.current[0] = { x: mousePos.current.x, y: mousePos.current.y };

      for (let i = 1; i < trailCount; i++) {
        const prev = dots.current[i - 1];
        const curr = dots.current[i];
        const ease = 0.1;
        dots.current[i] = {
          x: curr.x + (prev.x - curr.x) * ease,
          y: curr.y + (prev.y - curr.y) * ease,
        };
      }

      dots.current.forEach((dot, i) => {
        if (dotRefs.current[i]) {
          dotRefs.current[i].style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-white font-satoshi relative">
      <Navbar />

      <section className="bg-[#ffffff] bg-opacity-30 py-10 sm:py-16 lg:py-24 font-satoshi overflow-x-hidden">
        <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8 flex items-center">
          <div className="flex flex-col space-y-4 w-full">
            <div className="reveal-container text-center mb-4">
              <p className="flap-reveal text-base font-semibold tracking-wider text-blue-600 uppercase text-center">
                A Platform for your Future
              </p>
            </div>
            <div className="text-center lg:mt-10 w-screen">
              <div className="reveal-container">
                <h1 className="flap-reveal text-9xl font-bold text-black leading-none">
                  <span className="inline-flex items-center justify-center pl-8 pr-6 pt-1 pb-5 mr-4 text-blue-500">
                    Ace
                  </span>
                  your Interview,
                </h1>
              </div>
              <div className="reveal-container mt-8">
                <span className="flap-reveal block text-7xl font-bold text-black">
                  Every. Single. Time.
                </span>
              </div>
            </div>
            <div className="reveal-container text-center">
              <p className="flap-reveal mt-4 text-base text-black lg:mt-8 sm:text-xl text-center">
                Grow your career fast at the right place.
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href="#"
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-blue-300 rounded-full lg:mt-16 hover:bg-blue-400 focus:bg-blue-400"
                role="button"
              >
                Join for free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </div>
            <div>
              <p className="mt-5 text-gray-600 text-center">
                Already joined us?{' '}
                <a href="#" className="text-black transition-all duration-200 hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Desc />
      <Features />
      <Footer />
    </div>
  );
}

export default Landing;
