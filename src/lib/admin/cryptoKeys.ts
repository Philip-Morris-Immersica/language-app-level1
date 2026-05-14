/**
 * AES-256-GCM encrypt/decrypt for API keys stored in DB.
 * Requires ENCRYPTION_KEY env var (32-byte hex string = 64 hex chars).
 */

function getEncryptionKey(): Uint8Array {
  const hex = process.env.ENCRYPTION_KEY;
  if (!hex || hex.length < 64) {
    throw new Error('ENCRYPTION_KEY env var missing or too short (need 64 hex chars = 32 bytes)');
  }
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function hexToUint8Array(hex: string): Uint8Array {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return arr;
}

function uint8ArrayToHex(arr: Uint8Array): string {
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function encryptKey(plaintext: string): Promise<string> {
  const keyMaterial = getEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const rawKey = keyMaterial.buffer.slice(keyMaterial.byteOffset, keyMaterial.byteOffset + keyMaterial.byteLength) as ArrayBuffer;
  const cryptoKey = await crypto.subtle.importKey(
    'raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt']
  );
  const enc = new TextEncoder();
  const encoded = enc.encode(plaintext);
  const ivBuf = iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) as ArrayBuffer;
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: ivBuf },
    cryptoKey,
    encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength) as ArrayBuffer,
  );
  const ivHex = uint8ArrayToHex(iv);
  const cipherHex = uint8ArrayToHex(new Uint8Array(cipherBuf));
  return `${ivHex}:${cipherHex}`;
}

export async function decryptKey(ciphertext: string): Promise<string> {
  const keyMaterial = getEncryptionKey();
  const [ivHex, cipherHex] = ciphertext.split(':');
  const iv = hexToUint8Array(ivHex);
  const cipherArr = hexToUint8Array(cipherHex);
  const rawKey = keyMaterial.buffer.slice(keyMaterial.byteOffset, keyMaterial.byteOffset + keyMaterial.byteLength) as ArrayBuffer;
  const cryptoKey = await crypto.subtle.importKey(
    'raw', rawKey, { name: 'AES-GCM' }, false, ['decrypt']
  );
  const ivBuf = iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) as ArrayBuffer;
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuf },
    cryptoKey,
    cipherArr.buffer.slice(cipherArr.byteOffset, cipherArr.byteOffset + cipherArr.byteLength) as ArrayBuffer,
  );
  return new TextDecoder().decode(plainBuf);
}

export function maskKey(plaintext: string): string {
  if (plaintext.length <= 8) return '****';
  return `${plaintext.slice(0, 4)}...${plaintext.slice(-4)}`;
}
