import CryptoJS from 'crypto-js';

export default function encryptThings(userInput, userPassword) {

  const SECRET_KEY = userPassword;

  function encryptString(str) {
    const encrypted = CryptoJS.AES.encrypt(str, SECRET_KEY).toString();
    return encrypted;
  }

  function decryptString(encryptedStr) {
    const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  const encryptedMessage = encryptString(userInput);
  console.log(encryptedMessage);
  const originalMessage = decryptString(encryptedMessage);
  console.log(originalMessage);
}