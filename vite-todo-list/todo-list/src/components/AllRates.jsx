import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function() {

  const [ allRates, setAllRates ] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const result = await response.json();
      setAllRates(result)
    };
    fetchData();
    }, [])

  if ( Object.keys(allRates).length === 0 || allRates === undefined ) return "Loading..."

  const buildAllRates = Object.keys(allRates.rates).map(key => {
      const value = allRates.rates[key];
      const entropy = Date.now();

      return (
          <div key={key} className='footer-text'>{key}: {value}</div>
      );
    });


  return (
    <div className='all-rates-container'>
      <Link to='/home'>
        <div className='black-text'>Home</div>
      </Link>
      {buildAllRates}
    </div>
  );
};