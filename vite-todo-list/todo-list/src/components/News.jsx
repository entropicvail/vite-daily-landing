import { useEffect, useState } from 'react';
import '../styles/News.css'

export default function DrudgeFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const PROXY_URL = 'https://corsproxy.io/?url=';
    const DRUDGE_URL = 'https://feedpress.me/drudgereportfeed';

    fetch(PROXY_URL + DRUDGE_URL)
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");
        const fetchedItems = Array.from(xml.querySelectorAll("item"));
        setItems(fetchedItems);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='news-container'>
      <h2 className='centered-h2'>News Feed</h2>
      <ul className='news-list'>
        {items.map((item, index) => (
          <li className='news-item' key={index}>
            <a className='news-link' href={item.querySelector("link").textContent}>
              {item.querySelector("title").textContent}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};