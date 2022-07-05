import crypto from "crypto";
import secureRandom from "crypto-random-string";

export default class Encryptor {
  generateKey() {
    return secureRandom({ length: 32 });
  }
  generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
}
