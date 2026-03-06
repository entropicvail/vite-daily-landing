import { useState, useRef, useEffect } from 'react';
import '../styles/Notes.css'
import encryptThings from '../helpers/encryptThings'

export default function Notes() {

  const [note, setNote] = useState(() => {
    const savedNote = localStorage.getItem('saved_note');
    return savedNote ? JSON.parse(savedNote) : '';
  });

  useEffect(() => {
    localStorage.setItem('saved_note', JSON.stringify(note));
  }, [note])

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [note]);


  const text = 'Test';
  const pass = 'password';
  encryptThings(text, pass)

  return (
    <div className='notes-container'>
      <h2 className='centered-h2'>Running Notes</h2>
      <textarea
        className='text-area'
        ref={textAreaRef}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your notes here..."
        style={{ overflow: 'hidden', resize: 'none', width: '100%' }}
      />
    </div>
  );
};