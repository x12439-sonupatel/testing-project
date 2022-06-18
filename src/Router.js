import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Details } from "./component";

function RouterComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
