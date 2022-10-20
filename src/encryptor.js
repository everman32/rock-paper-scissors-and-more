import crypto from "crypto";
import secureRandom from "crypto-random-string";

export default class Encryptor {
  static generateKey() {
    return secureRandom({ length: 32 });
  }
  static generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
}
