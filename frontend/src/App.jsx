import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import Browse from "./pages/Browse.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";
import Detail from "./pages/Detail.jsx";
import LoginPage from "./pages/auth/Login.jsx";
import UpcomingAnimePage from "./pages/Upcoming.jsx";
import NewAnimePage from "./pages/NewAnime.jsx";
import RegisterPage from "./pages/auth/Register.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/upcoming-anime" element={<UpcomingAnimePage />} />
            <Route path="/new-anime" element={<NewAnimePage />} />
        </Routes>
    );
}