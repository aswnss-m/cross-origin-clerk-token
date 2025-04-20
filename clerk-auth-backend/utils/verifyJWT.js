// verifyJWT.js
// npm install jsonwebtoken jwks-rsa


const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

// Initialize JWKS client (for fetching the public key)
const client = jwksClient({
  jwksUri: `${process.env.NEXT_PUBLIC_CLERK_JWKS_URL}`, // Your JWKS URL
  cache: true, // Cache the JWKS for improved performance
  rateLimit: true, // Enable rate limiting
});

// Function to get the key
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

const verifyJWT = (jwtToken) => {
  return new Promise((resolve, reject) => {
    if (!jwtToken) {
      return reject({ message: "Unauthorized: No JWT provided", status: 401 });
    }

    jwt.verify(
      jwtToken,
      getKey,
      {
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err);
          return reject({ message: "Unauthorized: Invalid JWT", status: 401 });
        }

        // Validate the token's expiration (exp) and not before (nbf) claims
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime || decoded.nbf > currentTime) {
          console.error("JWT Verification Error:", "Token is expired or not yet valid");
          return reject({ message: "Unauthorized: Expired JWT", status: 401 });
        }

        // Validate the token's authorized party (azp) claim
        const permittedOrigins = [process.env.NEXT_PUBLIC_CLERK_FRONTEND_API];
        if (decoded.azp && !permittedOrigins.includes(decoded.azp)) {
          console.error("JWT Verification Error:", "Invalid 'azp' claim");
          return reject({ message: "Unauthorized: Invalid 'azp' claim", status: 401 });
        }

        // If all validations pass, return the decoded token
        resolve(decoded);
      }
    );
  });
};

module.exports = verifyJWT;
