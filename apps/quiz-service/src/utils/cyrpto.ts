import crypto from 'crypto';

function encrypt(text:string,SECRET_KEY:string) {
  const KEY = crypto.createHash('sha256').update(String(SECRET_KEY)).digest('base64').substr(0, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(KEY), iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return iv + encrypted text, separated by ':'
  return iv.toString('hex') + ':' + encrypted;
}


export function decrypt(encryptedText:string,SECRET_KEY:string) {
  const KEY = crypto.createHash('sha256').update(String(SECRET_KEY)).digest('base64').substr(0, 32);
  const parts = encryptedText.split(':');
  const ivPart = parts.shift();
  if (!ivPart) {
    throw new Error('Invalid encrypted text format: missing IV');
  }
  const iv = Buffer.from(ivPart, 'hex');
  const encrypted = parts.join(':');

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(KEY), iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}


