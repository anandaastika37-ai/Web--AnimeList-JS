import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/index.css'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import profile from '../assets/profile.jpg'
import logoAnimeList from '../assets/logoAnimeList.png'

export default function Navbar(){
    return(
        <>
        <nav>
            <div className="nav-container w-full h-17 flex items-center justify-between p-6 bg-linear-to-l from-indigo-700 to-indigo-900">
                <div className="Logo text-white text-xl flex items-center gap-4">
                    <img src={logoAnimeList} alt="" className="w-8 h-8"/>
                    <h2 className="font-montserrat font-bold">Anime<span className="text-sky-200">List</span></h2>
                </div>
                <div className="right-side flex w-[25%] items-center justify-between">
                    <div className="Navigasi w-[80%]">
                        <ul className="flex w-full items-center justify-between text-white font-semibold">
                            <li className="hover:bg-blue-900 py-1 px-3 rounded-md transition-all ease-in duration-100"><a href="">Home</a></li>
                            <li className="hover:bg-blue-900 py-1 px-3 rounded-md transition-all ease-in duration-100"><a href="">Browse</a></li>
                            <li className="hover:bg-blue-900 py-1 px-3 rounded-md transition-all ease-in duration-100"><a href="">Category</a></li>
                            <li className="hover:bg-blue-900 py-1 px-3 rounded-md transition-all ease-in duration-100"><a href="">Rangkings</a></li>
                        </ul>
                    </div>
                        <div className="user-login flex items-center justify-center w-[15%]">
                            <button className="bg-purple-500 text-white hover:bg-purple-900 px-4 py-2 rounded-md text-sm font-medium "><a href="">Login</a></button>
                            <span className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:border-white/60 hidden">
                                    <img src={profile} alt="profile" className=" hover:brightness-50 rounded-full"/>
                            </span>
                        </div>
                    <div className="dropdown-user absolute right-5 top-20 bg-linear-to-r from-indigo-500 to-indigo-800 text-white rounded-l-xl hidden">
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
                </div>
            </div>
        </nav>
        </>
    )
}