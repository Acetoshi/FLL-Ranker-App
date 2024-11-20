import argon2 from "argon2";

// Function to verify the password during login
async function verifyPassword(
  storedHash: string,
  inputPassword: string
): Promise<boolean> {
  try {
    const isValid = await argon2.verify(storedHash, inputPassword);
    return isValid;
  } catch {
    throw new Error("Error verifying password");
  }
}
export default verifyPassword;
