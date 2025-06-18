import ky from "ky";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1/";


// Utility to extract a specific cookie by name
function getCookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

const api = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // 🔥 Ensures cookies are sent for CORS auth-required requests
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getCookieValue("token"); // 🧠 replace with your token's cookie name
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
        console.log(`Requesting: ${request.method} ${request.url} Token: ${!!token}`);
      },
    ],
    afterResponse: [
      (_request, _options, _response) => {
        // Optional: add error logging or global response handling
      },
    ],
  },
});

export default api;
