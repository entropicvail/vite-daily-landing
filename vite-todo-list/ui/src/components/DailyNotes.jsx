import { useState, useRef, useEffect } from 'react';
import '../styles/Notes.css';
import { useSelectedDateProvider } from '../context/selectedDateContext'
import Calendar from './Calendar';
import Notes from './Notes';
import PopupSearch from './PopupSearch'
import EncryptText from './EncryptText';
import DecryptText from './DecryptText';

export default function DailyNotes() {

  const { sharedDate } = useSelectedDateProvider();

  const [ isOpen, setIsOpen ] = useState(false);

  const [ note, setNote ] = useState(() => {
    const savedNote = localStorage.getItem('daily_note');
    return savedNote ? JSON.parse(savedNote) : '';
  });

  useEffect(() => {
    if (!hasLoaded.current) return;
    const storedNotes = JSON.parse(localStorage.getItem('daily_note') || '{}');
    storedNotes[sharedDate] = note;
    localStorage.setItem('daily_note', JSON.stringify(storedNotes));
  }, [note]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('daily_note') || '{}');
    const loadedNote = storedNotes[sharedDate];
    setNote(typeof loadedNote === 'string' ? loadedNote : '');
    hasLoaded.current = true;
  }, [sharedDate]);

  const textAreaRef = useRef(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [note]);

  const noteExport = { note, setNote };

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  const closeSearchBar = () => {
    setIsOpen(false);
  };

  return (
    <div className='dailyNotes-container'>
      <Calendar />
      <Notes />
      <div className='div-separator'></div>
      <h2 className='centered-h2 default-cursor' onClick={() => PopupSearch}>Daily Notes</h2>
      <div className='orange-text'>Current Note: {sharedDate}</div>
        <div className='notes-container'>
          <textarea
            className='text-area'
            ref={textAreaRef}
            value={note}
            onChange={(e) => setNote( e.target.value )}
            placeholder="Type your notes here..."
            style={{ overflow: 'hidden', resize: 'none', width: '90%' }}
          />
          <div className='enc-container'>
            <EncryptText noteExport={noteExport} />
            <DecryptText noteExport={noteExport} />
          </div>
        </div>
    </div>
  );
};