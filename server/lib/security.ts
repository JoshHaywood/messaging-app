import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Hashing algorithm parameters
const salt = crypto.randomBytes(256).toString("hex");
const iterations = 1000; 
const hashSize = 64;
const hashAlgorithm = "sha256";

// Hash the password with the random salt and .env pepper
function HashPassword(password: string, salt: string) {
  const pepper = process.env.PEPPER;

  // Return password, salt, and pepper with algorithm parameters
  return crypto
    .pbkdf2Sync(password, salt + pepper, iterations, hashSize, hashAlgorithm)
    .toString("hex");
}

module.exports = { HashPassword, salt };