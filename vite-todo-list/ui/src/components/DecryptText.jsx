import { useState } from 'react'
import decryptThings from '../helpers/decryptThings'
import DecryptModal from './DecryptModal'

export default function DecryptText({ noteExport }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { note, setNote } = noteExport
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDecrypt = (password) => {
    const decryptedMessage = decryptThings(note, password)
    setNote(decryptedMessage);
    handleCloseModal();
  };

  return (
    <div className='decrypt-div'>
      <button onClick={handleOpenModal}>
        Decrypt
      </button>
      <DecryptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleDecrypt}
      />
    </div>
  )
}