import { useEffect, useRef, useState } from "react";
import "./stocks.css";

interface DataPoint {
  time: number;
  value: number;
}

const DURATION_SECONDS = 30;
const TICK_MS = 100;
const START_VALUE = 100;
const STARTING_BALANCE = 1000;

function GraphPage() {
  const [data, setData] = useState<DataPoint[]>([{ time: 0, value: START_VALUE }]);
  const [isRunning, setIsRunning] = useState(true);
  const valueRef = useRef(START_VALUE);
  const timeRef = useRef(0);

  const [cash, setCash] = useState(STARTING_BALANCE);
  const [shares, setShares] = useState(0);
  const [avgBuyPrice, setAvgBuyPrice] = useState<number | null>(null);

  const currentPrice = data[data.length - 1].value;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      timeRef.current += TICK_MS / 1000;

      const step = (Math.random() - 0.5) * 100;
      valueRef.current = Math.max(0, Math.min(1000, valueRef.current + step));

      setData((prev) => [...prev, { time: timeRef.current, value: valueRef.current }]);

      if (timeRef.current >= DURATION_SECONDS || valueRef.current <= 0) {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleRestart = () => {
    valueRef.current = START_VALUE;
    timeRef.current = 0;
    setData([{ time: 0, value: START_VALUE }]);
    setIsRunning(true);
    setCash(STARTING_BALANCE);
    setShares(0);
    setAvgBuyPrice(null);
  };

  // shared logic: spend a dollar amount, update units + weighted avg price
  const executeBuy = (spendAmount: number) => {
    if (!spendAmount || spendAmount <= 0) return;

    const unitsBought = spendAmount / currentPrice;
    const totalUnitsBefore = shares;
    const newTotalUnits = shares + unitsBought;

    const newAvgPrice =
      avgBuyPrice === null
        ? currentPrice
        : (avgBuyPrice * totalUnitsBefore + currentPrice * unitsBought) / newTotalUnits;

    setShares(newTotalUnits);
    setAvgBuyPrice(newAvgPrice);
    setCash((prev) => prev - spendAmount);
  };

  // shared logic: sell a number of units, add proceeds to cash
  const executeSell = (unitsToSell: number) => {
    if (unitsToSell <= 0 || unitsToSell > shares) return;

    const proceeds = unitsToSell * currentPrice;
    const remainingUnits = shares - unitsToSell;

    setCash((prev) => prev + proceeds);
    setShares(remainingUnits);
    if (remainingUnits <= 0) setAvgBuyPrice(null); // fully sold out, reset cost basis
  };

  const handleBuyAll = () => {
    if (cash <= 0) return;
    executeBuy(cash);
  };

  const handleBuyOne = () => {
    executeBuy(currentPrice); // cost of exactly 1 unit at current price
  };

  const handleSellAll = () => {
    executeSell(shares);
  };

  const handleSellOne = () => {
    executeSell(Math.min(1, shares)); // sell 1 unit, or whatever's left if less than 1
  };

  const width = 800;
  const height = 400;
  const maxTime = DURATION_SECONDS;
  const maxValue = 1000;

  const points = data.map((d) => {
    const x = (d.time / maxTime) * width;
    const y = height - (d.value / maxValue) * height;
    return `${x},${y}`;
  });

  const pathD = points.length > 0 ? `M ${points.join(" L ")}` : "";

  const portfolioValue = cash + shares * currentPrice;
  const profitLoss = portfolioValue - STARTING_BALANCE;

  return (
    <div className="graph-page">
      <h2>Big Mega Corporation {isRunning ? "(running...)" : "(finished)"}</h2>

      <div className="stats-bar">
        <div className={cash < 0 ? "negative" : ""}>Cash: ${cash.toFixed(2)}</div>
        <div>
          Holding: {shares > 0 ? `${shares.toFixed(2)} units @ avg $${avgBuyPrice?.toFixed(2)}` : "None"}
        </div>
        <div>Portfolio Value: ${portfolioValue.toFixed(2)}</div>
        <div className={profitLoss >= 0 ? "profit" : "loss"}>
          P/L: {profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)}
        </div>
      </div>

      <svg width={width} height={height} className="graph-svg">
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} className="graph-midline" />
        <path d={pathD} className="graph-line" fill="none" />
      </svg>

      <div className="current-price">Current price: ${currentPrice.toFixed(2)}</div>

      <div className="trade-controls">
        <button onClick={handleBuyOne} className="buy-btn">
          Buy 1
        </button>
        <button onClick={handleBuyAll} disabled={cash <= 0} className="buy-btn">
          Buy All
        </button>
        <button onClick={handleSellOne} disabled={shares <= 0} className="sell-btn">
          Sell 1
        </button>
        <button onClick={handleSellAll} disabled={shares <= 0} className="sell-btn">
          Sell All
        </button>
        <button onClick={handleRestart} className="graph-restart-btn">
          Restart
        </button>
      </div>
    </div>
  );
}

export default GraphPage;