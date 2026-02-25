import { useState, useEffect } from "react";

export default function MarketCard({ title, category }) {
  const [yes, setYes] = useState(Math.floor(Math.random() * 40) + 30);
  const [timeLeft, setTimeLeft] = useState(900);
  const [liquidity, setLiquidity] = useState(
    Math.floor(Math.random() * 900) + 100
  );

  const no = 100 - yes;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const voteYes = () => {
    const shift = Math.floor(Math.random() * 4) + 1;
    const newYes = Math.min(yes + shift, 95);
    setYes(newYes);
    setLiquidity(prev => prev + shift * 10);
  };

  const voteNo = () => {
    const shift = Math.floor(Math.random() * 4) + 1;
    const newYes = Math.max(yes - shift, 5);
    setYes(newYes);
    setLiquidity(prev => prev + shift * 10);
  };

  const formatTime = s => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <div className="market-card">
      <div className="market-header">
        <span className="category">{category}</span>
        <span className="timer">{formatTime(timeLeft)}</span>
      </div>

      <h3>{title}</h3>

      <div className="percentage-bar">
        <div
          className="yes-bar"
          style={{ width: `${yes}%` }}
        ></div>
      </div>

      <div className="odds">
        <button className="yes" onClick={voteYes}>
          YES {yes}%
        </button>
        <button className="no" onClick={voteNo}>
          NO {no}%
        </button>
      </div>

      <div className="liquidity">
        Liquidity: {liquidity} tBTC
      </div>
    </div>
  );
}