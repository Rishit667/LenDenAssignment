const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";
const KEY = Buffer.from(process.env.AADHAR_SECRET_KEY, "utf8"); 
const IV_SIZE = 16;


function encryptAadharNo(aadharNumber) {
  const iv = crypto.randomBytes(IV_SIZE);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(aadharNumber, "utf8"),
    cipher.final(),
  ]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}


function decryptAadharNo(payload) {
  const [ivHex, encryptedHex] = payload.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

module.exports = {
  encryptAadharNo,
  decryptAadharNo,
};

