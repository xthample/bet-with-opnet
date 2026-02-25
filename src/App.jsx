import { useState, useMemo } from "react";
import MarketCard from "./MarketCard";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("ENDING");

  const categories = [
    "ALL",
    "CRYPTO",
    "SPORTS",
    "ESPORTS",
    "ECONOMICS",
    "POLITICS",
    "ENTERTAINMENT",
    "OTHER"
  ];

  const markets = [
    { title: "BTC above $70,000 at 2AM?", category: "CRYPTO", liquidity: 780, time: 540 },
    { title: "ETH above $3,000?", category: "CRYPTO", liquidity: 830, time: 600 },
    { title: "Real Madrid wins tonight?", category: "SPORTS", liquidity: 1200, time: 900 },
    { title: "Team Liquid wins next match?", category: "ESPORTS", liquidity: 500, time: 400 },
    { title: "US inflation below 3%?", category: "ECONOMICS", liquidity: 300, time: 1200 },
    { title: "Candidate A wins election?", category: "POLITICS", liquidity: 900, time: 1500 },
    { title: "Movie X above $500M?", category: "ENTERTAINMENT", liquidity: 650, time: 800 },
    { title: "Random global event?", category: "OTHER", liquidity: 200, time: 300 }
  ];

  const filteredMarkets = useMemo(() => {
    let result = [...markets];

    if (filter !== "ALL") {
      result = result.filter(m => m.category === filter);
    }

    if (search) {
      result = result.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "ENDING") {
      result.sort((a, b) => a.time - b.time);
    }

    if (sortBy === "LIQUIDITY") {
      result.sort((a, b) => b.liquidity - a.liquidity);
    }

    return result;
  }, [filter, search, sortBy]);

  return (
    <div className="app">
      <div className="top-bar">
        <h1>OP_MARKETS</h1>

        <button
          className="wallet-btn"
          onClick={() => setConnected(!connected)}
        >
          {connected ? "Wallet Connected" : "Connect OP_WALLET"}
        </button>
      </div>

      {/* Search + Sort */}
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search markets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="ENDING">Ending Soon</option>
          <option value="LIQUIDITY">Highest Liquidity</option>
        </select>
      </div>

      {/* Category Filters */}
      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="market-count">
        Showing {filteredMarkets.length} of {markets.length} markets
      </p>

      <div className="grid">
        {filteredMarkets.map((m, i) => (
          <MarketCard key={i} {...m} />
        ))}
      </div>

      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <p>🥇 TraderAlpha — +12%</p>
        <p>🥈 SignalX — +9%</p>
        <p>🥉 LayerOne — +7%</p>
      </div>
    </div>
  );
}