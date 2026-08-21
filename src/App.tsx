import { useEffect, useState } from 'react'
import jaemieImg from './assets/jaemie.jpg'
import jaemieVid from "./assets/jaemie.mp4";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (count === 0) return;

    if (count === 10) {
      setShowVideo(true);
    }

    const heartCount = Math.min(count, 50);
    const staggerStep = 80; // ms between each heart starting

    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: i * staggerStep,
    }));
    setHearts(newHearts);

    // clean up after the animation finishes
    const totalDuration = heartCount * staggerStep + 2000;
    const timeout = setTimeout(() => setHearts([]), totalDuration);
    return () => clearTimeout(timeout);
  }, [count]);


  return (
    <>
      <section id="center">
        <div className="jaemie">
          <img src={jaemieImg} className="jaemie" width="384" height="510" alt="Jaemie Pic" />
        </div>
        <div>
          <h1>Hello, Jaemie!</h1>
          <p>
            Click for a surprise! 🥳
          </p>
          {showVideo && (
            <div className="video-overlay" onClick={() => setShowVideo(false)}>
              <button
                className="video-close"
                onClick={() => setShowVideo(false)}
              >
                ✕
              </button>
              <video
                src={jaemieVid}
                autoPlay
                controls
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

        </div>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          I Love You: {count}
        </button>
        
        <button
          type="button"
          className="reset"
          onClick={() => setCount(0)}
        >
          Reset
        </button>

        <div className="heart-container">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}ms`
              }}
            >
              ❤️
            </span>
          ))}
        </div>

      </section>
    </>
  )
}

export default App
