import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import imgIntro from "../assets/imgIntro.png";
import logoAnimeListNavy from "../assets/logoAnimeListNavy.png";
import { faMedal, faAnglesRight, faFire, faClock, faThumbsUp, faStar, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import imgTest from "../assets/imgTest.jpg";
import AnimeCard from "../components/AnimeCard.jsx";
import AnimeList from "../data/animeList.json";

const seeMoreClass = "text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors text-sm sm:text-base shrink-0";

function animePopuler() {
    return [...AnimeList].sort((a, b) => a.rating - b.rating).slice(0, 4);
}

function newAnime() {
    return [...AnimeList].sort((a, b) => a.year - b.year).slice(0, 6);
}


export default function HomePage() {
    const colorLinear = ['bg-linear-to-l from-orange-700 to-yellow-500', 'bg-linear-to-l from-cyan-700 to-blue-500', 'bg-linear-to-l from-pink-700 to-red-500', 'bg-linear-to-l from-green-700 to-lime-500'];
    const colorLinear2 = ['bg-linear-to-l from-orange-800 to-yellow-600', 'bg-linear-to-l from-cyan-800 to-blue-600', 'bg-linear-to-l from-pink-800 to-red-600', 'bg-linear-to-l from-green-800 to-lime-600'];
    const categories = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "School", "Slice of Life", "Isekai", "Mystery", "Horror", "Psychological", "Sci-Fi", "Sports", "Supernatural"];

    return (
        <MainLayout>
            <div className="home-container w-full flex flex-col items-center gap-6 sm:gap-8 justify-center pb-6">
                {/* first: hero */}
                <div className="intro w-[95%] min-h-fit lg:min-h-[70vh] border bg-linear-to-t from-blue-900 to-blue-950 shadow-sm border-gray-100 rounded-xl flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-10 py-10 lg:py-16 px-4 sm:px-8">
                    <div className="text w-full lg:w-1/2 text-sky-100 text-center lg:text-left">
                        <div className="font-bold text-2xl sm:text-3xl mb-2 font-montserrat flex items-center justify-center lg:justify-start gap-4 text-white">
                            <div className="w-9 sm:w-10 shrink-0 bg-white p-2 rounded-md">
                                <img src={logoAnimeListNavy} alt="AnimeList logo" className="w-full" />
                            </div>
                            <h4>AnimeList</h4>
                        </div>
                        <h3 className="font-extrabold font-open-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                            Discover Your Next <span className="bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Favorite</span> Anime
                        </h3>
                        <p className="font-medium text-base sm:text-lg lg:text-xl xl:text-2xl mt-5">
                            Explore amazing stories, unforgettable characters, and countless worlds. Find your favorite anime and keep track of everything you love in one place.
                        </p>
                        <h3 className="mt-5 font-open-sans flex items-center justify-center lg:justify-start text-sm sm:text-base font-medium gap-3">
                            <span className="text-yellow-400 font-bold text-3xl sm:text-4xl lg:text-5xl">1000+</span>
                            <span>anime<br />tersedia</span>
                        </h3>
                        <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
                            <a href="#" className="px-8 sm:px-12 py-2 text-lg sm:text-xl bg-linear-to-r from-indigo-500 hover:from-indigo-800 hover:to-purple-800 to-purple-500 font-bold rounded-md text-white transition-colors">
                                Explore
                            </a>
                            <a href="#" className="px-3 py-2 text-lg sm:text-xl bg-linear-to-b from-yellow-500 hover:from-yellow-800 hover:to-orange-800 to-orange-500 font-bold rounded-md text-white flex items-center transition-colors">
                                <FontAwesomeIcon icon={faMedal} />
                            </a>
                        </div>
                        <div className="category flex flex-wrap justify-center lg:justify-start gap-2 w-full lg:w-[80%] mt-8">
                            {categories.map((category) => (
                                <a key={category} href="#" className="border-2 border-gray-400 font-semibold text-xs sm:text-sm py-0.5 px-2 rounded-md hover:bg-gray-600/50 transition-colors">
                                    {category}
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Sesuai catatan: gambar hero disembunyikan di mobile/tablet, hanya tampil di layar desktop (lg ke atas) */}
                    <div className="img hidden lg:block lg:w-[38%] xl:max-w-md shrink-0">
                        <img
                            src={imgIntro}
                            alt="Featured anime artwork"
                            className="w-full aspect-[4/5] object-cover rounded-2xl"
                        />
                    </div>
                </div>
                {/* first end */}

                {/* second: new anime */}
                <div className="w-[95%] bg-white border border-gray-100 flex flex-col items-center py-8 sm:py-10 gap-6 rounded-xl shadow-md">
                    <div className="w-[95%] flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-700 flex items-center gap-2">
                            <FontAwesomeIcon icon={faClock} className="text-blue-500" />
                            New Anime
                        </h3>
                        <a href="#" className={seeMoreClass}>See more<FontAwesomeIcon icon={faAnglesRight} /></a>
                    </div>
                    <div className="card-container w-[95%] flex items-stretch gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [&>*]:shrink-0 [&>*]:snap-start">
                        {newAnime().map((anime) => (
                            <AnimeCard key={anime.title} {...anime} className={`w-67`}/>
                        ))}
                    </div>
                </div>
                {/* second end */}

                {/* third: Top 4 Terpopuler (kiri) & Rekomendasi (kanan) */}
                <div className="w-[95%] flex flex-col lg:flex-row items-stretch justify-between gap-4">
                    {/* left: top 4 popular */}
                    <div className="flex flex-col gap-6 w-full lg:w-[65%] bg-white border border-gray-100 rounded-xl shadow-md py-8 sm:py-10 px-4 sm:px-6">
                        <div className="w-[95%] mx-auto flex flex-wrap items-center justify-between gap-2">
                            <div className="leading-tight">
                                <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-700 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faFire} className="text-orange-500" />
                                    Top 4 Terpopuler
                                </h3>
                                <p className="text-gray-500 text-xs sm:text-sm mt-1">Dipilih berdasarkan anime yang paling populer saat ini</p>
                            </div>
                            <a href="#" className={seeMoreClass}>See more<FontAwesomeIcon icon={faAnglesRight} /></a>
                        </div>
                        <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {animePopuler().map((top, index) => (
                                <a
                                    key={top.title}
                                    href="#"
                                    className={`${colorLinear[index]} hover:shadow-2xl p-2 rounded-md hover:-translate-y-1 ease-in transition-all duration-300 flex gap-3`}
                                >
                                    <img src={imgTest} alt={top.title} className="w-34 sm:w-38 md:w-42 lg:w-46 h-auto object-cover rounded-md shrink-0" />
                                    <div className="text-white py-3 px-2 min-w-0  w-[60%] flex flex-col justify-between">
                                        <div className="">
                                        <span className={`${colorLinear2[index]} py-1 px-3 text-xl font-bold rounded-md border border-gray-300 mb-2`}>{index + 1}</span>
                                        </div>
                                        <div className="w-full">
                                            <h2 className="text-base sm:text-lg font-open-sans font-bold mb-2 truncate">{top.title}</h2>
                                            <ul className="flex flex-wrap gap-1.5 mb-1.5">
                                                {top.genres.slice(0,2).map((genre) => (
                                                    <li key={genre} className="border text-[10px] sm:text-xs rounded-md border-gray-300 py-0.5 px-2">{genre}</li>
                                                ))}
                                            </ul>
                                            <div className="flex items-center text-xs sm:text-sm gap-3 mb-2">
                                                <span className="font-bold"><FontAwesomeIcon icon={faStar} className="text-yellow-300" /> {top.rating}</span>
                                                <span>|</span>
                                                <span className="font-medium">{top.episodes} Eps</span>
                                            </div>
                                            <h4 className="text-xs sm:text-sm font-normal mb-2 truncate"><FontAwesomeIcon icon={faBuilding} /> {top.studio}</h4>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="bg-linear-to-l from-indigo-700 to-purple-500 py-1 px-2 text-[10px] sm:text-xs font-semibold rounded-md">{top.status}</span>
                                                <div className="flex gap-2 shrink-0">
                                                    <FontAwesomeIcon icon={faHeart} className="text-white text-sm" />
                                                    <FontAwesomeIcon icon={faBookmark} className="text-white text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* right: rekomendasi */}
   
                </div>
                {/* third end */}

                {/* fourth: about animelist dan statistik */}

                {/* fourth end */}
            </div>
        </MainLayout>
    );
}