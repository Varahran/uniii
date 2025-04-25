import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [isTiming, setIsTiming] = useState(false);
  const [quote, setQuote] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  const cards = [
    { question: 'What is Figma?', answer: 'A design tool, like Photoshop but for UI/UX.' },
    { question: 'What’s a wireframe?', answer: 'Just a rough sketch of a layout. No colors, no distractions.' },
    { question: 'Why use wireframes?', answer: 'Because figuring out the structure early saves time later.' },
  ];

  const quotes = [
    "You're already behind, might as well keep going.",
    "You're trying. That counts for something.",
    "It’s 2 AM. Do you know where your GPA is?",
    "You miss 100% of the naps you don’t take.",
  ];

  // give a random quote on first load
  useEffect(() => {
    setQuote(pickQuote());
  }, []);

  // handle timer countdown
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
            {cards.map((card, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <p><strong>Q:</strong> {card.question}</p>
                {showAnswers && <p><strong>A:</strong> {card.answer}</p>}
              </div>
            ))}
            <button onClick={() => setShowAnswers(prev => !prev)}>
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
