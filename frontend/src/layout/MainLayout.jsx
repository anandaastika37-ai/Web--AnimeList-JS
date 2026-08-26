import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLayout({children}){
    return(
        <>
        <Navbar/>
        <main className="pt-23">
            {children}
        </main>
        <Footer/>
        </>
    )
}