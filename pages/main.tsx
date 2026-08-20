import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";
import { PagesApp } from "./app";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <PagesApp />
  </StrictMode>,
);
