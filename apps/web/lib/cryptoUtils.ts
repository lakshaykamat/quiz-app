import CryptoJS from 'crypto-js';

const SECRET_KEY = '23CA6986FDD4EA2FA5FD5F9D36ECA'; //TODO  move to env

// Encrypt
export function encrypt(text:string) {
  const ciphertext = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return ciphertext;
}

// Decrypt
export function decrypt(ciphertext:string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

// console.log(decrypt("e6578e241553cbaf4d70661c20169513:b1e5a7dc06b964fe6b9463f0859dacb6"))
  // or pass from env at build time
