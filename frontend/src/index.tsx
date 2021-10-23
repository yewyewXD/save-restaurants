import React from "react";
import ReactDOM from "react-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/global.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

async function setupSentry() {
  const { Integrations } = await import("@sentry/tracing");
  const Sentry = await import("@sentry/react");

  Sentry.init({
    dsn: "https://48b2f7c3b0a54d2281373eaaa135d0c5@o1008394.ingest.sentry.io/5972297",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.0,
  });
}

if (process.env.NODE_ENV === "production") {
  setupSentry();
}

Aos.init({ duration: 1000 });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
