'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [cardsData, setCardsData] = useState<any>(null);
  const [count, setCount] = useState(0);

  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/distribute?n=${count}`)
      .then((res) => setCardsData(res.data))
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch data. Please try again.');
      });
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-xl mx-auto mb-8 flex gap-4">
        <input
          type="number"
          min={0}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cardsData &&
          Object.entries(cardsData).map(([person, cards]: any) => (
            <div
              key={person}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-black"
            >
              <h2 className="text-xl font-bold mb-4">{person}</h2>
              <div className="grid grid-cols-4 gap-2 text-sm">
                {cards.map((card: string, idx: number) => {
                  const suit = card.slice(-1); // last character
                  const isRed = suit === 'H' || suit === 'S';

                  return (
                    <div
                      key={idx}
                      className={`rounded px-2 py-1 text-center ${
                        isRed ? 'bg-red-200 text-red-800' : 'bg-gray-200'
                      }`}
                    >
                      {card}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
