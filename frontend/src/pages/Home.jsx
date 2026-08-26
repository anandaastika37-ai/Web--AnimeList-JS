import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import imgIntro from "../assets/imgIntro.png"
import logoAnimeListNavy from "../assets/logoAnimeListNavy.png"
import { faMedal } from "@fortawesome/free-solid-svg-icons";

export default function Home(){
    return(
        <MainLayout>
            <div className="home-container w-full flex flex-col items-center justify-center">
                {/* first */}
                <div className="intro w-[95%] h-[70vh] border bg-linear-to-t from-blue-900 to-blue-950 shadow-sm border-gray-100 rounded-xl flex items-center justify-around">
                    <div className="text w-[50%] text-sky-100">
                        <div className="font-bold text-3xl mb-2 font-montserrat flex items-center gap-4 text-white">
                            <div className="w-10 bg-white p-2 rounded-md">
                                <img src={logoAnimeListNavy} alt="logo" className="w-9"/>
                            </div>
                            <h4>AnimeList</h4>
                        </div>
                        <h3 className="font-extrabold font-open-sans text-7xl">Discover Your Next <span className="bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Favorite</span> Anime</h3>
                        <p className="font-medium text-2xl mt-5">Explore amazing stories, unforgettable characters, and countless worlds. Find your favorite anime and keep track of everything you love in one place.</p>
                        <div className="mt-10 flex gap-4">
                            <button className="px-12 py-2 text-xl bg-linear-to-r from-indigo-500 hover:from-indigo-800  hover:to-purple-800 to-purple-500 font-bold rounded-md"><a href="">Explore</a></button>
                            <button className="px-3 py-2 text-xl bg-linear-to-b from-yellow-500 hover:from-yellow-800  hover:to-orange-800 to-orange-500  font-bold rounded-md"><a href=""><FontAwesomeIcon icon={faMedal}/></a></button>
                        </div>
                    </div>
                    <div className="img w-xl rounded-2xl">
                        <img src={imgIntro} alt="imgintro" className="rounded-2xl"/>
                    </div>
                </div>
                {/* firts end */}
                {/* second */}
                <div className="w-[95%] h-[80vh]">
                    <div className=""></div>
                </div>
                {/* second end */}
            </div>
        </MainLayout>
    )
}