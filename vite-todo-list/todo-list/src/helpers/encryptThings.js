import CryptoJS from 'crypto-js';

export default function encryptThings(userInput, userPassword) {

  const SECRET_KEY = userPassword;

  function encryptString(str) {
    const encrypted = CryptoJS.AES.encrypt(str, SECRET_KEY).toString();
    return encrypted;
  }

  const encryptedMessage = encryptString(userInput);

  return encryptedMessage;
};