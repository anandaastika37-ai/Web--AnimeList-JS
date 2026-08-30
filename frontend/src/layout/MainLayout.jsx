import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLayout({children}){
    return(
        <>
        <Navbar/>
        <main className="">
            {children}
        </main>
        <Footer/>
        </>
    )
}