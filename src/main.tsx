import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home-page/Home.tsx";
import { pages } from "./pages/home-page/pages.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/koji-conglomerate-of-useful-stuff">
      <Routes>
        <Route path="/" element={<Home />} />
        {pages.map((page) => (
          <Route key={page.path} path={page.path} element={<page.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);