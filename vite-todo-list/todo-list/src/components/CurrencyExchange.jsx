import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import fetchAPI from '../api/fetchAPI';
import '../styles/CurrencyExchangeRates.css';

export default function CurrencyExchange() {
  const output = fetchAPI('https://open.er-api.com/v6/latest/USD');
  const [ input, setInput ] = useState('');
  const [ currentCurrency, setCurrentCurrency ] = useState('');
  const [ searchHistory, setSearchHistory ] = useState({});
  const navigate = useNavigate();

  const buildRates = () => {

    return (
      <table>
        <caption>Today's Rates | USD</caption>
        <thead>
          <tr>
            <th>Country</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brazil - Real</td>
            <td>{output.rates.BRL}</td>
          </tr>
          <tr>
            <td>UK - Pound</td>
            <td>{output.rates.GBP}</td>
          </tr>
          <tr>
            <td>Japan - Yen</td>
            <td>{output.rates.JPY}</td>
          </tr>
          <tr>
            <td>China - Yuan</td>
            <td>{output.rates.CNY}</td>
          </tr>
          <tr>
            <td>Russia - Ruble</td>
            <td>{output.rates.RUB}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  function handleAllClick(event) {
    event.preventDefault();
    navigate('/allrates');
  }

  function handleInput(event) {
    event.preventDefault()
    setInput(event.target.value)
  }

  function ratesSearch() {
    const rate = output.rates[input.toUpperCase()]
    const upInput = input.toUpperCase();

    if ( rate === undefined ) {
      setCurrentCurrency('Currency not found; please check ticker...');
    } else {
      setCurrentCurrency(`${input.toUpperCase()} : ${rate}`);
      setSearchHistory({...searchHistory, [upInput]: `${rate}`});
    }
  }

  const buildHistory = Object.keys(searchHistory).map(key => {
    const value = searchHistory[key];

    return (<div className='footer-text history-text' key={key}>{key} : {value}</div>);
    });

  if ( Object.keys(output).length === 0 || output === undefined ) return "Loading..."

  return (
    <div className='rates-container'>
      {buildRates()}
      <div className='footer-text'>{output.time_last_update_utc}</div>
      <div className='currency-search'>
        <div className='search-input-container'>
          <button onClick={handleAllClick}>All</button>
          <input
            type='search'
            placeholder='Enter currency...'
            onChange={handleInput}
            value={input}>
          </input>
          <button onClick={ratesSearch} value={input}>Search</button>
        </div>
        <div className='footer-text'>Current Search | {currentCurrency}</div>
        <div className="footer-text search-history" >
          Custom List
          {buildHistory}
        </div>
      </div>
    </div>
  )
}