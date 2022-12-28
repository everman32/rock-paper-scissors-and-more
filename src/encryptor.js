import crypto from "node:crypto";

export default {
  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  },

  generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  },
};
