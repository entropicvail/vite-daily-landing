import { useState, useEffect, useRef } from 'react';
import '../styles/SearchBar.css';

export default function PopupSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const searchBarRef = useRef(null);

  const toggleSearchBar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchBarRef]);

  console.log('PopupSearch invoked')

  return (
    <div>
      <button onClick={toggleSearchBar}>
        {isOpen ? 'Close Search' : 'Open Search'}
      </button>

      {isOpen && (
        <div ref={searchBarRef} className="popup-search-bar">
          <input type="text" placeholder="Search..." />
          <button onClick={toggleSearchBar}>Go</button>
        </div>
      )}
    </div>
  );
};
