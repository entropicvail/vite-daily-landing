import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import '../styles/AllRates.css'

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
          <div key={key} className='footer-text allrates-item'>{key}: {value}</div>
      );
    });


  return (
    <div className='all-rates-component'>
        <Link to='/home'>
          <h1 className='top-link'>Home</h1>
        </Link>
      <div className='all-rates-container'>
        {buildAllRates}
      </div>
    </div>
  );
};