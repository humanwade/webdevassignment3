import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// [수정] basename 변수 삭제하거나 무시

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* basename 속성을 아예 지우면 기본값이 '/'가 됩니다 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
