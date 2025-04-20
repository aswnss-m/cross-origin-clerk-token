# Clerk Authentication Example: Next.js Frontend & Express.js Backend

This project demonstrates a secure authentication flow using Clerk for a Next.js frontend and an Express.js backend. The Next.js application handles user authentication through Clerk, and then securely communicates with the Express.js backend using JWT (JSON Web Token) authentication.

## Overview

The project consists of two main parts:

*   **Next.js Frontend (clerk-auth-frontend):** Handles user sign-up, sign-in, and session management using Clerk.  After successful authentication, it retrieves a JWT from Clerk and uses it to make authenticated requests to the backend.
*   **Express.js Backend (clerk-auth-backend):**  Exposes an API endpoint (`/api`) that is protected by JWT authentication.  It verifies the JWT received from the frontend before processing the request.

The `/api/test` route in the Next.js frontend calls the `/api` endpoint in the Express.js backend.

## Prerequisites

Before you begin, make sure you have the following installed:

*   **Node.js:** (version 18 or higher is recommended)
*   **npm** (Node Package Manager) or **Yarn**
*   **Clerk Account:** You'll need a Clerk account to manage user authentication. Sign up at [https://clerk.com](https://clerk.com).

## Setup

1.  **Clone the Repository:**

    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install Dependencies:**

    For the Next.js frontend:

    ```bash
    cd clerk-auth-frontend
    npm install  # or yarn install
    cd ..
    ```

    For the Express.js backend:

    ```bash
    cd clerk-auth-backend
    npm install # or yarn install
    cd ..
    ```

3.  **Configure Environment Variables:**

    Create `.env` files in both the `clerk-auth-frontend` and `clerk-auth-backend` directories.
  
    Replace the placeholder values with your actual Clerk API keys and frontend URL.  You can find these keys in your Clerk dashboard.  Make sure the `NEXT_PUBLIC_CLERK_FRONTEND_API` value is the *origin* of your Next.js application (e.g., `http://localhost:3000` or `https://your-app.com`).

4.  **Clerk Setup:**

    *   Go to your Clerk dashboard and create a new application.
    *   Configure the sign-in and sign-up URLs in your Clerk dashboard to match the `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` values in your `.env` file.
    *   Create a token template in Clerk, or use the default.  If you create a template make sure it is being referenced in the Next.js app in `src/app/api/token/route.ts`
    *   Under Allowed Origins, make sure the origin is there such as `http://localhost:3000`

## Running the Project

1.  **Start the Next.js Frontend:**

    ```bash
    cd clerk-auth-frontend
    npm run dev  # or yarn dev
    ```

    This will start the Next.js development server, typically at `http://localhost:3000`.

2.  **Start the Express.js Backend:**

    ```bash
    cd clerk-auth-backend
    npm start  # or yarn start
    ```

    This will start the Express.js server, typically at `http://localhost:8000`.

## Usage

1.  **Access the Next.js Application:** Open your web browser and navigate to the address where your Next.js application is running (e.g., `http://localhost:3000`).
2.  **Sign Up/Sign In:** Use the Clerk-powered sign-up and sign-in forms to create an account or log in.
3.  **Test the Authenticated API Call:** Once signed in, the `/api/test` route in Next.js will call the Express backend `/api` endpoint and will display the return.

## Project Structure

*   **clerk-auth-frontend/:**
    *   `src/app`: Contains the Next.js application code.
    *   `src/app/api/token/route.ts`:  Fetches a JWT from Clerk after authentication and calls the Express backend.
    *   `src/middleware.ts`: Configures Clerk authentication middleware.
    *   `.env`: Environment variables for the frontend.
*   **clerk-auth-backend/:**
    *   `routes/index.js`: Contains the Express.js route handler for the `/api` endpoint, including JWT verification.
    *   `verifyJWT.js`: Function to extract the JWT verification to reduce clutter and for reusability.
    *   `.env`: Environment variables for the backend.

## Key Concepts

*   **JWT (JSON Web Token) Authentication:**  The Next.js frontend obtains a JWT from Clerk after successful authentication.  This JWT is then included in the `Authorization` header (as a bearer token) when making requests to the Express.js backend.
*   **Cross-Origin Authentication:** Because the frontend and backend are running on different origins (domains or ports), this project demonstrates how to securely authenticate cross-origin requests using JWTs.
*   **Manual JWT Verification:** The Express.js backend uses manual JWT verification (using libraries like `jsonwebtoken` and `jwks-rsa`) to ensure the JWT is valid and was issued by your Clerk instance.
*   **JWKS (JSON Web Key Set):** The backend retrieves the public key from the Clerk JWKS endpoint to verify the JWT's signature.

## Security Considerations

*   **Never commit your Clerk secret key to a public repository!**  Store it securely as an environment variable.
*   Always validate the `exp` (expiration time), `nbf` (not before), and `azp` (authorized party) claims in your JWTs.
*   Use HTTPS in production to protect your application from man-in-the-middle attacks.
*   Implement rate limiting to prevent abuse.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[Specify your license here, e.g., MIT]
