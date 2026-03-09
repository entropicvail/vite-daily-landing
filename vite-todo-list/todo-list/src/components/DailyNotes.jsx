import { useState, useRef, useEffect, useContext } from 'react';
import '../styles/Notes.css';
import { useSelectedDateProvider } from '../context/selectedDateContext'
import Calendar from './Calendar';
import Notes from './Notes';
import EncryptText from './EncryptText';
import DecryptText from './DecryptText';

export default function DailyNotes() {

  const [ note, setNote ] = useState(() => {
    const savedNote = localStorage.getItem('daily_note');
    return savedNote ? JSON.parse(savedNote) : {};
  });

  useEffect(() => {
    localStorage.setItem('daily_note', JSON.stringify(note));
  }, [note]);

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [note]);

  const noteExport = { note, setNote };
  const { sharedDate } = useSelectedDateProvider();

  console.log(typeof note)

  return (
    <div className='dailyNotes-container'>
      <Calendar />
      <Notes />
      <div className='div-separator'></div>
      <h2 className='centered-h2'>{ 'Daily Notes' }</h2>
        <div className='notes-container'>
          <textarea
            className='text-area'
            ref={textAreaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
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