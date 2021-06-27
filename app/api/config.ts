import axios from "axios";

export const apiCashier = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://cashier-app.vercel.app/api"
      : "http://localhost:3000/api",
});
