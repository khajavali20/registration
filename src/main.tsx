import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  config.baseURL = import.meta.env.DEV
    ? "/api"
    : "https://www.lifehealthemergency.com/api";
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axios.interceptors.response.use(function (response) {
  if (response.data) return response.data;
  return response.data;
});

const client = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
    mutations: { retry: false },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
