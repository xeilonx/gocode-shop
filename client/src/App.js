import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}
export default App;