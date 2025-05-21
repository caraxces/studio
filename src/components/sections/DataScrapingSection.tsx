'use client';

import React, { useState } from 'react';

const DataScrapingSection: React.FC = () => {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setScrapedData(null);
    setError(null);

    try {
      const response = await fetch('/scrape', { // Assuming your backend is accessible at the root or proxied
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scrape data');
      }

      const data = await response.json();
      setScrapedData(data.html_content);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6">Data Scraping</h2>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter URL to scrape"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Added text-black for visibility
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Scraping...' : 'Scrape'}
        </button>
      </form>

      {scrapedData && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Scraped Data:</h3>
          <div className="border rounded-md p-4 overflow-auto max-h-96 text-black bg-gray-100"> {/* Added text-black and background */}
            <pre>{scrapedData}</pre>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4">
          Error: {error}
        </div>
      )}
    </section>
  );
};

export default DataScrapingSection;