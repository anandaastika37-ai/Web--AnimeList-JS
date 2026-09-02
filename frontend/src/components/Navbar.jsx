import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/index.css'
import { faUser, faBoxArchive, faArrowRightFromBracket, faBars, faXmark, faHouse, faCompass, faLayerGroup, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import profile from '../assets/profile.jpg'
import logoAnimeList from '../assets/logoAnimeList.png'

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <>
            <nav className="nav-container fixed z-20  w-full h-17 flex items-center justify-between px-4 md:px-6 lg:px-8 bg-linear-to-l from-indigo-900 to-indigo-950">
                <a href="/" className="Logo cursor-pointer text-white text-xl flex items-center gap-2 md:gap-4">
                    <img src={logoAnimeList} alt="" className="w-8 h-8"/>
                    <h2 className="font-montserrat font-bold text-lg md:text-xl">Anime<span className="text-sky-200">List</span></h2>
                </a>

                {/* Menu desktop, tampil dari breakpoint lg ke atas */}
                <div className="right-side hidden lg:flex items-center gap-6 xl:gap-10">
                    <div className="Navigasi">
                        <ul className="flex items-center gap-1 xl:gap-2 text-white font-semibold">
                            <li className="hover:bg-purple-600 py-2 px-3 rounded-md transition-all ease-in duration-100"><a href="/">Home</a></li>
                            <li className="hover:bg-purple-600 py-2 px-3 rounded-md transition-all ease-in duration-100"><a href="/browse">Browse</a></li>
                            <li className="hover:bg-purple-600 py-2 px-3 rounded-md transition-all ease-in duration-100"><a href="/category">Category</a></li>
                            <li className="hover:bg-purple-600 py-2 px-3 rounded-md transition-all ease-in duration-100"><a href="/ranking">Rangkings</a></li>
                        </ul>
                    </div>
                    <div className="user-login flex items-center justify-center gap-3">
                        <button className="bg-blue-600 text-white hover:bg-purple-900 px-4 py-2 rounded-md text-sm font-medium "><a href="/login">Login</a></button>
                        <span className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:border-white/60 hidden">
                                <img src={profile} alt="profile" className=" hover:brightness-50 rounded-full"/>
                        </span>
                    </div>
                </div>

                {/* Login + hamburger berdampingan, khusus mobile */}
                <div className="flex lg:hidden items-center gap-3">
                    <button className="bg-blue-600 text-white hover:bg-purple-900 px-3 py-1.5 rounded-md text-sm font-medium">
                        <a href="/login">Login</a>
                    </button>
                    <button
                        className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars}/>
                    </button>
                </div>

                <div className="dropdown-user absolute right-5 top-20 bg-linear-to-r from-indigo-500 to-indigo-800 text-white rounded-l-xl hidden z-20">
                    <ul className="flex flex-col gap-2.5 items-start list-none px-5 py-3">
                        <li className="flex items-center gap-3 pb-2 border-b border-white/20 w-full">
                            <img src={profile} alt="profile" className="w-9 h-9 rounded-full border-2 border-white"/>
                            <span>
                                <h4 className="font-semibold">Fullname</h4>
                                <h5 className="text-sm">username</h5>
                            </span>
                        </li>
                        <li><a href="" className="flex gap-3 items-center text-sm"><FontAwesomeIcon icon={faUser}/>Profile</a></li>
                        <li><a href="" className="flex gap-3 items-center text-sm"><FontAwesomeIcon icon={faBoxArchive}/>Dashboad</a></li>
                        <li className="pt-2 border-t border-white/20 w-full"><a href="" className="p-1 text-sm font-medium"><FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout</a></li>
                    </ul>
                </div>
            </nav>

            {/* Panel menu mobile, muncul di kanan bawah tombol hamburger, tanpa backdrop */}
            <div className={`fixed right-4 top-20 w-15 bg-linear-to-b from-indigo-900 to-indigo-950 rounded-xl z-50 flex flex-col items-center py-5 gap-15 lg:hidden origin-top-right transition-all duration-200 ease-out ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                <div className="flex flex-col items-center gap-2 w-full">
                    <a href="/" aria-label="Home" className="w-10 h-10 flex items-center justify-center text-white hover:bg-purple-600 rounded-lg transition-all ease-in duration-100">
                        <FontAwesomeIcon icon={faHouse}/>
                    </a>
                    <a href="/browse" aria-label="Browse" className="w-10 h-10 flex items-center justify-center text-white hover:bg-purple-600 rounded-lg transition-all ease-in duration-100">
                        <FontAwesomeIcon icon={faCompass}/>
                    </a>
                    <a href="/category" aria-label="Category" className="w-10 h-10 flex items-center justify-center text-white hover:bg-purple-600 rounded-lg transition-all ease-in duration-100">
                        <FontAwesomeIcon icon={faLayerGroup}/>
                    </a>
                    <a href="/ranking" aria-label="Rangkings" className="w-10 h-10 flex items-center justify-center text-white hover:bg-purple-600 rounded-lg transition-all ease-in duration-100">
                        <FontAwesomeIcon icon={faTrophy}/>
                    </a>
                </div>
            </div>
        </>
    )
}