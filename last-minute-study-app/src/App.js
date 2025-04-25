import { useState, React } from 'react';
import './App.css';

export default function App() {
  const [section, setSection] = useState('home');
  const [timeLeft, setTimeLeft] = useState(600);
  const [quote, setQuote] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    { question: "what is Figma?", answer: "Design and prototyping tool" },
    { question: "what is wireframe in figma?", answer: "simple layout showing app structure" },
    { question: "why we need wireframe?", answer: "wireframes help visualize structure and guide user experience" }
  ];

  const quotes = [
    "You're already behind, might as well keep going.",
    "you’re trying. that’s enough i guess.",
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
    }, 999);
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
            <h1> Last Minute Study App </h1>
            <p>This app is made for students who are short on time but still want to get things done.</p>
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
            <p>This app is built for students who need to make the most of their last minute study time With a timer, flash cards, and daily quotes, 
              it's all about helping you stay focused, motivated, and ready even when time is tight.</p>
             <p>Created by </p>
          </div>
        )}
      </main>
    </div>
  );
}
