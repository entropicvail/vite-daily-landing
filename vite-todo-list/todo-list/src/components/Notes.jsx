import { useState, useRef, useEffect } from 'react';
import '../styles/Notes.css'

export default function Notes() {
  const [note, setNote] = useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [note]);

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