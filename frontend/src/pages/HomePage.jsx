import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import imgIntro from "../assets/imgIntro.png";
import logoAnimeListNavy from "../assets/logoAnimeListNavy.png";
import { faMedal, faAnglesRight, faFire, faClock, faThumbsUp, faBookOpen, faBolt, faUsers } from "@fortawesome/free-solid-svg-icons";
import imgTest from "../assets/imgTest.jpg";
import AnimeCard from "../components/AnimeCard.jsx";
import AnimeList from "../data/animeList.json";


const seeMoreClass = "text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors text-sm sm:text-base shrink-0";

function animePopuler(){
    const topAnimeList = [...AnimeList].sort((a , b) => a.rating - b.rating).slice(0,4)
    return topAnimeList
}

function newAnime(){
    const newAnime = [...AnimeList].sort((a,b) => a.year - b.year).slice(0,8)
    return newAnime
}

function recomandAnime(){
    const recommendedAnimeList = [...AnimeList].sort((a, b) => a.popularity - b.popularity).slice(0, 6);
    return recommendedAnimeList
}

console.log(animePopuler())
console.log(newAnime())
console.log(recomandAnime())

export default function HomePage() {
    const categories = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "School", "Slice of Life", "Isekai", "Mystery", "Horror", "Psychological", "Sci-Fi", "Sports", "Supernatural"];
    
    return (
        <MainLayout>
            <div className="home-container w-full flex flex-col items-center gap-5 justify-center">
                {/* first */}
                <div className="intro w-[95%] min-h-[70vh] border bg-gradient-to-t from-blue-900 to-blue-950 shadow-sm border-gray-100 rounded-xl flex flex-col lg:flex-row items-center justify-around gap-10 py-10 lg:py-6 px-4 sm:px-8">
                    <div className="text w-full lg:w-1/2 text-sky-100 text-center lg:text-left">
                        <div className="font-bold text-2xl sm:text-3xl mb-2 font-montserrat flex items-center justify-center lg:justify-start gap-4 text-white">
                            <div className="w-9 sm:w-10 shrink-0 bg-white p-2 rounded-md">
                                <img src={logoAnimeListNavy} alt="logo" className="w-full" />
                            </div>
                            <h4>AnimeList</h4>
                        </div>
                        <h3 className="font-extrabold font-open-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">Discover Your Next <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Favorite</span> Anime</h3>
                        <p className="font-medium text-base sm:text-lg lg:text-xl xl:text-2xl mt-5">Explore amazing stories, unforgettable characters, and countless worlds. Find your favorite anime and keep track of everything you love in one place.</p>
                        <h3 className="mt-5 font-open-sans flex items-center justify-center lg:justify-start text-sm sm:text-base font-medium gap-3">
                            <span className="text-yellow-400 font-bold text-3xl sm:text-4xl lg:text-5xl">1000+</span> anime<br />tersedia
                        </h3>
                        <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
                            <a href="#" className="px-8 sm:px-12 py-2 text-lg sm:text-xl bg-gradient-to-r from-indigo-500 hover:from-indigo-800 hover:to-purple-800 to-purple-500 font-bold rounded-md text-white transition-colors">Explore</a>
                            <a href="#" className="px-3 py-2 text-lg sm:text-xl bg-gradient-to-b from-yellow-500 hover:from-yellow-800 hover:to-orange-800 to-orange-500 font-bold rounded-md text-white flex items-center transition-colors">
                                <FontAwesomeIcon icon={faMedal} />
                            </a>
                        </div>
                        <div className="category flex flex-wrap justify-center lg:justify-start gap-2 w-full lg:w-[80%] mt-8">
                            {categories.map((category) => (
                                <a key={category} href="#" className="border-2 border-gray-400 font-semibold text-xs sm:text-sm py-0.5 px-2 rounded-md hover:bg-gray-600/50 transition-colors">{category}</a>
                            ))}
                        </div>
                    </div>
                    <div className="img order-first lg:order-none w-full sm:w-2/3 lg:w-[38%] xl:max-w-md mx-auto lg:mx-0 shrink-0">
                        <img
                            src={imgIntro}
                            alt="imgintro"
                            className="w-full aspect-[4/5] object-cover rounded-2xl"
                        />
                    </div>
                </div>
                {/* firts end */}

                {/* second */}
                <div className="w-[95%] bg-white border border-gray-100 flex flex-col items-center py-10 gap-6 rounded-xl shadow-md">
                    <div className="w-[95%] flex items-center justify-between">
                        <h3 className="font-open-sans font-bold text-2xl text-gray-700 flex items-center gap-2">
                            <FontAwesomeIcon icon={faClock} className="text-blue-500" />
                            New Anime
                        </h3>
                        <a href="#" className={seeMoreClass}>See more<FontAwesomeIcon icon={faAnglesRight} /></a>
                    </div>
                    <div className="card-container w-[95%] flex items-center justify-center gap-4 overflow-x-auto pb-2">
                        {newAnimeList.map((anime) => (
                            <AnimeCard key={anime.title} {...anime} />
                        ))}
                    </div>
                </div>
                {/* second end */}

                {/* third: Top 5 Terpopuler (kiri) & Rekomendasi (kanan) */}
                <div className="w-[95%] flex items-center justify-between gap-4">
                        {/* left: top 5 popular */}
                        <div className="flex flex-col items-center justify-around gap-6 w-[65%] h-[70vh] bg-white border border-gray-100 rounded-xl shadow-md py-10 px-4 sm:px-6">
                            <div className="w-[95%] flex items-center justify-between">
                                <div className="leading-4">
                                <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-700 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faFire} className="text-orange-500" />
                                    Top 4 Terpopuler
                                </h3>
                                <br />
                                <p className="text-gray-500 text-xs sm:text-sm -mt-4">Dipilih berdasarkan anime yang paling populer saat ini</p>
                                </div>
                                <a href="#" className={seeMoreClass}>See more<FontAwesomeIcon icon={faAnglesRight} /></a>
                            </div>
                            <div className="w-[95%] flex flex-wrap items-center justify-center gap-2">
                                {animePopuler.map((top) => (
                                    <div className={`w-[49%] ${top.bg} p-2 rounded-md`}>
                                        <img src={imgTest} alt="" className="w-40 rounded-md"/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* right: rekomendasi */}
                        <div className="flex flex-col items-center justify-around gap-6 w-[35%] h-[70vh] bg-white border border-gray-100 rounded-xl shadow-md py-10 px-4 sm:px-6">
                            <div className="w-[95%] flex items-center justify-between">
                                <div className="leading-4">
                                <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-700 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faThumbsUp} className="text-purple-500" />
                                    Rekomendasi Untukmu
                                </h3>
                                <br />
                                <p className="text-gray-500 text-xs sm:text-sm -mt-4">Dipilih berdasarkan anime yang sedang tren minggu ini</p>
                                </div>
                                <a href="#" className={seeMoreClass}>See more<FontAwesomeIcon icon={faAnglesRight} /></a>
                            </div>
                            <div className="w-[95%] h-130 overflow-scroll flex flex-col gap-2">
                                {recommendedAnimeList.map((recomed) => (
                                    <div className="w-full flex gap-2 bg-white border border-gray-200 p-2 rounded-xl bg-linear-to-l from-indigo-800 to-blue-600">
                                        <img src={imgTest} alt="" className="w-25 rounded-md"/>
                                        <div className="">
                                            <h2>{recomed.title}</h2>
                                            <h2>{recomed.category}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
                {/* third end */}

                {/* fourth: aboute animelist dan statistik*/}

                {/* fourth end */}
            </div>
        </MainLayout>
    );
}