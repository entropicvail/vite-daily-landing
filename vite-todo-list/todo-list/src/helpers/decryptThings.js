import CryptoJS from 'crypto-js';

export default function decryptThings(userInput, userPassword) {

  const SECRET_KEY = userPassword;

  function decryptString(encryptedStr) {
    const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  const originalMessage = decryptString(userInput);

  return originalMessage;
};