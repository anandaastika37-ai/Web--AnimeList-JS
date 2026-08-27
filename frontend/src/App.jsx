import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Browse from "./pages/Browse.jsx";
import Category from "./pages/Category.jsx";
import Ranking from "./pages/Ranking.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/category" element={<Category />} />
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
  );
}