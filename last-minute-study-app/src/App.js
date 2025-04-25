import { useState, React } from 'react';
import './App.css';

export default function App() {
  const [section, setSection] = useState('home');
  const [timeLeft, setTimeLeft] = useState(600);
  const [quote, setQuote] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is a component?', answer: 'A reusable piece of UI.' },
    { question: 'What is state?', answer: 'An object to hold data that can change over time.' },
  ];

  const quotes = [
    "You're already behind, might as well keep going.",
    "Cry now, pass later.",
    "It’s 2 AM. Do you know where your GPA is?",
    "You miss 100% of the naps you don't take.",
  ];
  if (quote === '') {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }
  

  function startTimer() {
    let timer = 600;
    setTimeLeft(timer);
    const interval = setInterval(() => {
      timer -= 1;
      setTimeLeft(timer);
      if (timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  return (
    <div>
      <nav>
        <button onClick={() => setSection('home')}>Home</button>
        <button onClick={() => setSection('timer')}>Timer</button>
        <button onClick={() => setSection('flashcards')}>Flashcards</button>
        <button onClick={() => setSection('quotes')}>Quotes</button>
        <button onClick={() => setSection('about')}>About</button>
      </nav>

      <main>
        {section === 'home' && (
          <div>
            <h1>Last-Minute Study App</h1>
            <p>Fake it till you make it.</p>
          </div>
        )}

        {section === 'timer' && (
          <div>
            <h2>Timer</h2>
            <p>Time left: {timeLeft} seconds</p>
            <button onClick={startTimer}>Start 10-min Timer</button>
          </div>
        )}

        {section === 'flashcards' && (
          <div>
            <h2>Flashcards</h2>
            {flashcards.map((card, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <p><strong>Q:</strong> {card.question}</p>
                {showAnswer && <p><strong>A:</strong> {card.answer}</p>}
              </div>
            ))}
            <button onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? 'Hide Answers' : 'Show Answers'}
            </button>
          </div>
        )}

        {section === 'quotes' && (
          <div>
            <h2>Motivational Quote</h2>
            <p>{quote}</p>
            <button onClick={() => {setQuote(quotes[Math.floor(Math.random() * quotes.length)]);}}>New Quote</button>
          </div>
        )}

        {section === 'about' && (
          <div>
            <h2>About This App</h2>
            <p>Made by someone who should be studying instead of coding this app.</p>
          </div>
        )}
      </main>
    </div>
  );
}
