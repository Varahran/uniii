import React, { useState, useEffect } from 'react';
import './App.css';
import figmaImage from './figma.jpg';
import wireframeImage from './wireframe.jpg';
import wireframe2Image from './wireframe2.jpg';

export default function App() {
  const [page, setPage] = useState('home');
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [isTiming, setIsTiming] = useState(false);
  const [quote, setQuote] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  const cards = [
    { 
      image: figmaImage, 
      question: 'What is Figma?', 
      answer: 'A design tool, like Photoshop but for UI/UX.' 
    },
    { 
      image: wireframeImage, 
      question: 'What’s a wireframe?', 
      answer: 'Just a rough sketch of a layout. No colors, no distractions.' 
    },
    { 
      image: wireframe2Image, 
      question: 'Why use wireframes?', 
      answer: 'Because figuring out the structure early saves time later.' 
    },
  ];

  const quotes = [
    "You're already behind, might as well keep going.",
    "You're trying. That counts for something.",
    "You miss 100% of the naps you don’t take.",
  ];


  useEffect(() => {
    setQuote(pickQuote());
  }, []);


  useEffect(() => {
    if (!isTiming || secondsLeft <= 0) return;

    const tick = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(tick);
          setIsTiming(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [isTiming, secondsLeft]);

  function pickQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function startTimer() {
    setSecondsLeft(600);
    setIsTiming(true);
  }

  return (
    <div className="app">
      <header>
        <h1>Last Minute Study App</h1>
        <nav>
          {['home', 'timer', 'flashcards', 'quotes', 'about'].map(tab => (
            <button key={tab} onClick={() => setPage(tab)}>
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {page === 'home' && (
          <section>
            <h2>Hey. Let’s get to it.</h2>
            <p>This app is for students who meant to start earlier — but life happened.</p>
            <p>We’ve got a timer, flashcards, and a few honest quotes. Let’s go.</p>
          </section>
        )}

        {page === 'timer' && (
          <section>
            <h2>Timer</h2>
            <p>{secondsLeft} seconds left</p>
            {!isTiming && <button onClick={startTimer}>Start 10-Minute Sprint</button>}
            {isTiming && <p>Focus mode activated. No distractions.</p>}
          </section>
        )}

        {page === 'flashcards' && (
          <section>
            <h2>Flashcards</h2>
            <div className="flashcard-container">
              {cards.map((card, i) => (
                <div key={i} className="flashcard">
                  <img 
                    src={card.image} 
                    alt={`Flashcard: ${card.question}`} 
                    className="flashcard-img" 
                  />
                  <p className="flashcard-question"><strong>Q:</strong> {card.question}</p>
                  {showAnswers && <p className="flashcard-answer"><strong>A:</strong> {card.answer}</p>}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowAnswers(prev => !prev)}
              className="toggle-answers-btn"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
          </section>
        )}

        {page === 'quotes' && (
          <section>
            <h2>Today’s Vibe</h2>
            <blockquote>{quote}</blockquote>
            <button onClick={() => setQuote(pickQuote())}>Hit me with another</button>
          </section>
        )}

        {page === 'about' && (
          <section>
            <h2>About</h2>
            <p>This was thrown together by someone who knows the struggle of cramming at the last minute.</p>
            <p>No fluff. Just tools to help you survive the grind.</p>
            <p>Created By Seyed Arshia Mofidi</p>
          </section>
        )}
      </main>
    </div>
  );
}
