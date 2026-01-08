// import CryptoJS from 'crypto-js';

// // The character encoding is implicitly UTF-8 for JavaScript strings and buffers.
// const CHARACTER_ENCODING = 'utf-8';
// const AES_ENCRYPTION_ALGORITHM = 'AES';
// // The default key from your Java code
// const DEFAULT_KEY = "IGKVMIS";

// export class EncryptDecryptDataForURL {
//     // The key is set to the default from Java if not provided, for consistent use
//     private KEY: string = DEFAULT_KEY;

//     constructor(key?: string) {
//         if (key) {
//             this.KEY = key;
//         }
//     }

//     /**
//      * Replicates the Java getKeyBytes method: takes the first 16 bytes of the UTF-8 string.
//      * @param keyString The string to convert to a 16-byte key/IV.
//      * @returns A CryptoJS WordArray representing the 16-byte key/IV.
//      */
//     private getKeyWordArray(keyString: string): CryptoJS.lib.WordArray {
//         // Convert the key string to a WordArray (equivalent to Java's byte[] in CryptoJS)
//         const keyWordArray = CryptoJS.enc.Utf8.parse(keyString);

//         // AES-128 requires a 16-byte key (128 bits). 
//         // Java's getKeyBytes pads or truncates to 16 bytes.
//         // We'll replicate the truncation/padding logic here:
//         const requiredLengthInWords = 4; // 16 bytes = 4 words (32-bit words)
        
//         // Pad with zeros if necessary (Java's System.arraycopy does this implicitly)
//         while (keyWordArray.sigBytes < 16) {
//             keyWordArray.words.push(0);
//             keyWordArray.sigBytes += 4;
//         }

//         // Truncate if necessary (Java's Math.min(param.length, keyBytes.length))
//         if (keyWordArray.sigBytes > 16) {
//             keyWordArray.sigBytes = 16;
//             // The words array might be longer than 4, so we trim the WordArray object structure
//             keyWordArray.words = keyWordArray.words.slice(0, requiredLengthInWords);
//         }
        
//         return keyWordArray;
//     }

//     /**
//      * Encrypts the plain text using AES-128-CBC with a 16-byte key and a 16-byte IV 
//      * derived identically from the 'key' string.
//      * @param plainText The data to encrypt.
//      * @param key The key string (e.g., "IGKVMIS").
//      * @returns The Base64 encoded encrypted text (without line breaks).
//      */
//     public encrypt(plainText: string, key: string): string {
//         const keyIvWordArray = this.getKeyWordArray(key);

//         const encrypted = CryptoJS.AES.encrypt(plainText, keyIvWordArray, {
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7, // PKCS5Padding is equivalent to Pkcs7 in crypto-js
//             iv: keyIvWordArray,           // **Crucial Step: Use the key as the IV**
//         });

//         // Java's Base64.NO_WRAP produces a string without line breaks
//         // CryptoJS's toString() method on the CipherParams object is Base64 by default.
//         return encrypted.toString(); 
//     }

//     /**
//      * Decrypts the Base64 encoded encrypted text.
//      * @param encryptedText The Base64 encoded string to decrypt.
//      * @param key The key string used for encryption.
//      * @returns The original plain text string.
//      */
//     public decrypt(encryptedText: string, key: string): string {
//         const keyIvWordArray = this.getKeyWordArray(key);

//         const decrypted = CryptoJS.AES.decrypt(encryptedText, keyIvWordArray, {
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7, // PKCS5Padding is equivalent to Pkcs7 in crypto-js
//             iv: keyIvWordArray,           // **Crucial Step: Use the key as the IV**
//         });

//         // Convert the decrypted WordArray to a UTF-8 string
//         return decrypted.toString(CryptoJS.enc.Utf8);
//     }
    
//     // --- Utility Methods to match Java class structure ---

//     public encryptText(plainText: string): string {
//         try {
//             return this.encrypt(plainText, this.KEY);
//         } catch (error) {
//             console.error("Encryption failed:", error);
//             return null;
//         }
//     }

//     public decryptText(encryptedText: string): string {
//         try {
//             return this.decrypt(encryptedText, this.KEY);
//         } catch (error) {
//             console.error("Decryption failed:", error);
//             return null;
//         }
//     }
// }

// // --- Example Usage ---
// // const encryptor = new EncryptDecryptDataForURL();
// // const plain = "Hello World";
// // const encrypted = encryptor.encryptText(plain);
// // console.log("Encrypted:", encrypted);
// // const decrypted = encryptor.decryptText(encrypted);
// // console.log("Decrypted:", decrypted);