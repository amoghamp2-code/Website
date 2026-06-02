import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function FlightTracker() {
  const [config, setConfig] = useState({ routes: [], threshold: 300, alert_email: "", days_ahead: 30 });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [prices, setPrices] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`${API}/api/flights/config`).then(r => r.json()).then(setConfig);
    fetch(`${API}/api/flights/prices`).then(r => r.json()).then(setPrices);
  }, []);

  const addRoute = () => {
    if (!from || !to) return;
    setConfig(c => ({ ...c, routes: [...c.routes, { from: from.toUpperCase(), to: to.toUpperCase() }] }));
    setFrom(""); setTo("");
  };

  const removeRoute = (i) => setConfig(c => ({ ...c, routes: c.routes.filter((_, idx) => idx !== i) }));

  const save = async () => {
    await fetch(`${API}/api/flights/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setStatus("Saved!"); setTimeout(() => setStatus(""), 2000);
  };

  const runNow = async () => {
    setStatus("Checking...");
    await fetch(`${API}/api/flights/run-now`, { method: "POST" });
    const p = await fetch(`${API}/api/flights/prices`).then(r => r.json());
    setPrices(p);
    setStatus("Done! Email sent if deals found.");
    setTimeout(() => setStatus(""), 4000);
  };

  const deals = Object.entries(prices)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 15)
    .map(([key, price]) => {
      const parts = key.split("-");
      return { from: parts[0], to: parts[1], date: parts.slice(2).join("-"), price };
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">✈️ Flight Price Tracker</h1>

        {/* Routes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3 shadow-sm">
          <h2 className="font-semibold">Routes to Watch</h2>
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-1 w-20 uppercase bg-transparent"
              placeholder="FROM"
              value={from}
              maxLength={3}
              onChange={e => setFrom(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 w-20 uppercase bg-transparent"
              placeholder="TO"
              value={to}
              maxLength={3}
              onChange={e => setTo(e.target.value)}
            />
            <button onClick={addRoute} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
              Add
            </button>
          </div>
          {config.routes.length === 0 && <p className="text-sm text-gray-400">No routes added yet.</p>}
          {config.routes.map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded px-3 py-1">
              <span>{r.from} → {r.to}</span>
              <button onClick={() => removeRoute(i)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3 shadow-sm">
          <h2 className="font-semibold">Settings</h2>
          <label className="flex items-center gap-2 text-sm">
            Price alert threshold ($):
            <input type="number" className="border rounded px-2 py-1 w-24 bg-transparent" value={config.threshold}
              onChange={e => setConfig(c => ({ ...c, threshold: +e.target.value }))} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            Alert email:
            <input type="email" className="border rounded px-2 py-1 flex-1 bg-transparent" value={config.alert_email}
              onChange={e => setConfig(c => ({ ...c, alert_email: e.target.value }))} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            Days to look ahead:
            <input type="number" className="border rounded px-2 py-1 w-20 bg-transparent" value={config.days_ahead}
              onChange={e => setConfig(c => ({ ...c, days_ahead: +e.target.value }))} />
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <button onClick={save} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium">
            Save Config
          </button>
          <button onClick={runNow} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium">
            Check Now
          </button>
          {status && <span className="text-sm text-gray-500">{status}</span>}
        </div>

        {/* Price table */}
        {deals.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Cheapest Prices Found</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b dark:border-gray-600">
                  <th className="pb-2">Route</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((d, i) => (
                  <tr key={i} className="border-t dark:border-gray-700">
                    <td className="py-1.5">{d.from} → {d.to}</td>
                    <td className="py-1.5">{d.date}</td>
                    <td className="py-1.5 font-medium">${d.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
