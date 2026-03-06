import { useState } from 'react'
import encryptThings from '../helpers/encryptThings'
import EncryptModal from './EncryptModal'

export default function EncryptText({ noteExport }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { note, setNote } = noteExport
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEncrypt = (password) => {
    const encryptedMessage = encryptThings(note, password)
    setNote(encryptedMessage);
    handleCloseModal();
  };

  return (
    <div className='ecnrypt-div'>
      <button onClick={handleOpenModal}>
        Encrypt
      </button>
      <EncryptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleEncrypt}
      />
    </div>
  )
}