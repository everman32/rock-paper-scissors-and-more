import crypto from "node:crypto";
import secureRandom from "crypto-random-string";

export default {
  generateKey() {
    return secureRandom({ length: 32 });
  },

  generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  },
};
