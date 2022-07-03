import secureRandom from "crypto-random-string";
import crypto from "crypto";

export default class Encryptor {
  generateKey() {
    return secureRandom({ length: 32 });
  }
  generateHMAC(message, key) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
}
