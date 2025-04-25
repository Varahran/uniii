import { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [count, setCount] = useState(5);
  const [showAns, setShowAns] = useState(false);

  const quotes = [
    "you’re trying. that’s enough i guess.",
    "productivity is fake.",
    "google it, idk.",
    "you should’ve started earlier lol"
  ];

  const flashcards = [
    { q: "what's js", a: "coding language i think" },
    { q: "html purpose?", a: "boxes and stuff" },
    { q: "css is for?", a: "making it not ugly" }
  ];

  const runTimer = () => {
    let t = 100;
    setCount(t);
    let i = setInterval(() => {
      t -= 1;
      setCount(t);
      if (t <= 0) clearInterval(i);
    }, 999);
  };

  return (
    <div className="App">
      <div style={{ padding: '10px', background: '#222', margin: "0 auto", maxWidth: "800px", textAlign: "center" }}>
        <button onClick={() => setPage('home')}>home</button>
        <button onClick={() => setPage('timer')}>timer</button>
        <button onClick={() => setPage('cards')}>cards</button>
        <button onClick={() => setPage('quote')}>quote</button>
        <button onClick={() => setPage('about')}>about</button>
      </div>

      <div style={{ padding: '20px', margin: "0 auto", maxWidth: "800px", background: '#fff' }}>
        {page == 'home' && (
          <>
            <h1>No time for Study app</h1>
            <p>This app is made for students who are short on time but still want to get things done.
               Whether you're cramming before class, brushing up during a break, or just need a little motivation to get started</p>
          </>
        )}

        {page == 'timer' && (
          <>
            <h2>100 sec timer </h2>
            <button onClick={runTimer}>go</button>
            <p>{count > 0 ? count + ' sec' : 'done'}</p>
          </>
        )}

        {page == 'cards' && (
          <>
            <h2>flash cards?</h2>
            {flashcards.map((f, idx) => (
              <div key={idx} style={{ marginBottom: 10 }}>
                <p><b>Q:</b> {f.q}</p>
                {showAns && <p><b>A:</b> {f.a}</p>}
              </div>
            ))}
            <button onClick={() => setShowAns(!showAns)}>
              {showAns ? 'hide' : 'show'} answers
            </button>
          </>
        )}

        {(page == 'quote' || page == 'quote2') && (
          <>
            <h2>random quote</h2>
            <p>{quotes[Math.floor(Math.random() * quotes.length)]}</p>
            <button onClick={() => setPage(page == 'quote' ? 'quote2' : 'quote')}>try another</button>
          </>
        )}

        {page == 'about' && (
          <>
            <h2>about</h2>
            <p>This app is built for students who need to make the most of their last minute study time With a timer, flash cards, and daily quotes, 
              it's all about helping you stay focused, motivated, and ready even when time is tight.</p>
            <p>Created by </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
