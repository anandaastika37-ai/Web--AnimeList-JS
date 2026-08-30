import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import Browse from "./pages/Browse.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";
import Detail from "./pages/Detail.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/detail" element={<Detail />} />
        </Routes>
    );
}