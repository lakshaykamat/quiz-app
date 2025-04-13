import ky from "ky";

// You can optionally load your API base URL from env like this:
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const api = ky.create({
  prefixUrl: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: 10 sec timeout
  hooks: {
    beforeRequest: [
      (request) => {
        // Optional: add authorization headers here if needed
        // const token = localStorage.getItem("token");
        // if (token) request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    afterResponse: [
      (request, options, response) => {
        // Optional: global response handling, logging, etc.
      },
    ],
  },
});

export default api;
