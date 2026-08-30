import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import imgIntro from "../assets/imgIntro.png";
import logoAnimeListNavy from "../assets/logoAnimeListNavy.png";
import { 
    faMedal, faAnglesRight, faFire, faClock, faThumbsUp, 
    faStar, faBuilding, faUsers, faDatabase, faCommentDots 
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import imgTest from "../assets/imgTest.jpg";
import AnimeCard from "../components/AnimeCard.jsx";
import AnimeList from "../data/animeList.json";

const seeMoreClass = "text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors text-sm sm:text-base shrink-0";

function animePopuler() {
    // Top 4 rating tertinggi
    return [...AnimeList].sort((a, b) => b.rating - a.rating).slice(0, 4);
}

function newAnime() {
    // Anime terbaru
    return [...AnimeList].sort((a, b) => b.year - a.year).slice(0, 6);
}

function upcomingAnime() {
    // 10 Data dummy statis untuk Anime Upcoming
    return [
        { title: "Solo Leveling Season 2: Arise", genres: ["Action", "Adventure"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "Demon Slayer: Infinity Castle Arc", genres: ["Action", "Supernatural"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "Re:Zero 3rd Season", genres: ["Drama", "Fantasy"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "One Punch Man Season 3", genres: ["Action", "Comedy"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "Bleach: Thousand-Year Blood War 3", genres: ["Action", "Supernatural"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "Jujutsu Kaisen Season 3", genres: ["Action", "Fantasy"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "Chainsaw Man - The Movie: Reze Arc", genres: ["Action", "Horror"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "Spy x Family Season 3", genres: ["Comedy", "Action"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "Dr. Stone: Science Future", genres: ["Sci-Fi", "Adventure"], rating: "N/A", status: "Upcoming", image: imgTest },
        { title: "KonoSuba Season 4", genres: ["Comedy", "Fantasy"], rating: "N/A", status: "Upcoming", image: imgTest }
    ];
}

export default function HomePage() {
    const colorLinear = [
        'bg-gradient-to-l from-orange-700 to-yellow-500', 
        'bg-gradient-to-l from-cyan-700 to-blue-500', 
        'bg-gradient-to-l from-pink-700 to-red-500', 
        'bg-gradient-to-l from-green-700 to-lime-500'
    ];
    const colorLinear2 = [
        'bg-gradient-to-l from-orange-800 to-yellow-600', 
        'bg-gradient-to-l from-cyan-800 to-blue-600', 
        'bg-gradient-to-l from-pink-800 to-red-600', 
        'bg-gradient-to-l from-green-800 to-lime-600'
    ];
    const categories = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "School", "Slice of Life", "Isekai", "Mystery", "Horror", "Psychological", "Sci-Fi", "Sports", "Supernatural"];

    return (
        <MainLayout>
            <div className="home-container w-full flex flex-col items-center gap-8 sm:gap-10 justify-center pb-12 pt-24 bg-gray-50">
                
                {/* --- FIRST: HERO SECTION --- */}
                <div className="intro w-[95%] min-h-fit lg:min-h-[70vh] bg-gradient-to-t from-blue-900 to-blue-950 shadow-xl border border-gray-200 rounded-2xl flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-10 py-12 lg:py-16 px-6 sm:px-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="text w-full lg:w-1/2 text-sky-100 text-center lg:text-left z-10">
                        <div className="font-bold text-2xl sm:text-3xl mb-4 font-montserrat flex items-center justify-center lg:justify-start gap-4 text-white">
                            <div className="w-10 sm:w-12 shrink-0 bg-white p-2 rounded-xl shadow-md">
                                <img src={logoAnimeListNavy} alt="AnimeList logo" className="w-full" />
                            </div>
                            <h4>AnimeList</h4>
                        </div>
                        <h3 className="font-extrabold font-open-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4">
                            Discover Your Next <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Favorite</span> Anime
                        </h3>
                        <p className="font-medium text-base sm:text-lg lg:text-xl text-sky-200/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Explore amazing stories, unforgettable characters, and countless worlds. Find your favorite anime and keep track of everything you love in one place.
                        </p>
                        
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                            <a href="#explore" className="px-8 sm:px-10 py-3 text-lg font-bold bg-gradient-to-r from-indigo-500 hover:from-indigo-600 hover:to-purple-600 to-purple-500 rounded-lg text-white shadow-lg transition-all transform hover:-translate-y-1">
                                Explore Now
                            </a>
                            <a href="#ranking" className="px-5 py-3 text-lg bg-gradient-to-b from-yellow-400 hover:from-yellow-500 to-orange-500 font-bold rounded-lg text-white shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2">
                                <FontAwesomeIcon icon={faMedal} /> Ranking
                            </a>
                        </div>
                        
                        <div className="category flex flex-wrap justify-center lg:justify-start gap-2 w-full mt-4">
                            {categories.map((category) => (
                                <a key={category} href={`/genre/${category.toLowerCase()}`} className="border border-sky-400/50 text-sky-100 font-medium text-xs sm:text-sm py-1 px-3 rounded-full hover:bg-sky-500/20 hover:border-sky-300 transition-colors backdrop-blur-sm">
                                    {category}
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="img hidden lg:block lg:w-[40%] xl:max-w-md shrink-0 z-10">
                        <img
                            src={imgIntro}
                            alt="Featured anime artwork"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
                {/* --- HERO END --- */}

                {/* --- SECOND: NEW ANIME --- */}
                <div className="w-[95%] bg-white border border-gray-200 flex flex-col items-center py-8 sm:py-10 gap-6 rounded-2xl shadow-sm">
                    <div className="w-[95%] flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
                        <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-800 flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            Baru Ditambahkan
                        </h3>
                        <a href="/new" className={seeMoreClass}>Lihat Semua <FontAwesomeIcon icon={faAnglesRight} /></a>
                    </div>
                    <div className="card-container w-[95%] flex items-stretch gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&>*]:shrink-0 [&>*]:snap-start custom-scrollbar">
                        {newAnime().map((anime) => (
                            <AnimeCard key={anime.title} {...anime} className="w-48 sm:w-56 md:w-64" />
                        ))}
                    </div>
                </div>
                {/* --- SECOND END --- */}

                {/* --- THIRD: TOP 4 & UPCOMING --- */}
                <div className="w-[95%] flex flex-col xl:flex-row items-stretch justify-between gap-6">
                    
                    {/* Left: Top 4 Terpopuler */}
                    <div className="flex flex-col gap-6 w-full xl:w-[65%] bg-white border border-gray-200 rounded-2xl shadow-sm py-8 sm:py-10 px-4 sm:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
                            <div className="leading-tight">
                                <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-800 flex items-center gap-3">
                                    <div className="bg-orange-100 p-2 rounded-lg text-orange-500">
                                        <FontAwesomeIcon icon={faFire} />
                                    </div>
                                    Top 4 Terpopuler
                                </h3>
                                <p className="text-gray-500 text-xs sm:text-sm mt-1 ml-11">Dipilih berdasarkan anime yang paling populer saat ini</p>
                            </div>
                            <a href="/ranking" className={seeMoreClass}>Lihat Peringkat <FontAwesomeIcon icon={faAnglesRight} /></a>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {animePopuler().map((top, index) => (
                                <a
                                    key={top.title}
                                    href={`/anime/${top.title}`}
                                    className={`${colorLinear[index]} group hover:shadow-xl p-3 rounded-xl hover:-translate-y-1 ease-in transition-all duration-300 flex gap-4`}
                                >
                                    <img src={imgTest} alt={top.title} className="w-32 sm:w-36 md:w-40 h-auto object-cover rounded-lg shrink-0 shadow-sm group-hover:shadow-md transition-shadow" />
                                    <div className="text-white py-2 pr-2 min-w-0 flex flex-col justify-between w-full">
                                        <div>
                                            <span className={`${colorLinear2[index]} py-1 px-3 text-lg font-extrabold rounded-md border border-white/20 shadow-sm inline-block mb-3`}>
                                                #{index + 1}
                                            </span>
                                            <h2 className="text-base sm:text-lg font-open-sans font-bold mb-2 truncate drop-shadow-md">{top.title}</h2>
                                            <ul className="flex flex-wrap gap-1.5 mb-2">
                                                {top.genres?.slice(0, 2).map((genre) => (
                                                    <li key={genre} className="bg-black/20 backdrop-blur-sm text-[10px] sm:text-xs rounded-md border border-white/30 py-0.5 px-2">
                                                        {genre}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-xs sm:text-sm gap-3 mb-1">
                                                <span className="font-bold flex items-center gap-1"><FontAwesomeIcon icon={faStar} className="text-yellow-300" /> {top.rating}</span>
                                                <span className="opacity-50">|</span>
                                                <span className="font-medium">{top.episodes} Eps</span>
                                            </div>
                                            <h4 className="text-xs sm:text-sm font-normal truncate opacity-90"><FontAwesomeIcon icon={faBuilding} className="mr-1" /> {top.studio}</h4>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Anime Upcoming */}
                    <div className="flex flex-col gap-6 w-full xl:w-[35%] bg-white border border-gray-200 rounded-2xl shadow-sm py-8 sm:py-10 px-4 sm:px-8">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-800 flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                                Anime Upcoming
                            </h3>
                        </div>
                        
                        {/* Menambahkan scrollbar agar layout tidak bablas ke bawah karena ada 10 data */}
                        <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                            {upcomingAnime().map((anime) => (
                                <a 
                                    key={anime.title} 
                                    href={`/anime/${anime.title}`} 
                                    // Menggunakan gradien yang senada dengan tema web (Blue/Indigo)
                                    className="flex gap-4 items-center p-3 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-indigo-700/50 group"
                                >
                                    <img src={anime.image} alt={anime.title} className="w-16 h-20 object-cover rounded-md shadow-sm border border-white/10" />
                                    <div className="flex flex-col min-w-0">
                                        <h4 className="font-bold text-white text-sm sm:text-base truncate drop-shadow-md group-hover:text-sky-200 transition-colors">{anime.title}</h4>
                                        <div className="text-xs text-indigo-200 mb-1">{anime.genres?.slice(0, 2).join(", ")}</div>
                                        <div className="flex items-center gap-2 text-xs font-semibold">
                                            <span className="text-yellow-400"><FontAwesomeIcon icon={faStar} /> {anime.rating}</span>
                                            <span className="text-indigo-400">•</span>
                                            <span className="text-white bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/20">{anime.status}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                {/* --- THIRD END --- */}

                {/* --- FOURTH: ABOUT WEBSITE & STATISTIK --- */}
                <div className="w-[95%] bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 gap-10 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    <div className="md:w-1/2 flex flex-col gap-4 text-center md:text-left z-10">
                        <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat">Tentang AnimeList</h2>
                        <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
                            AnimeList adalah platform komunitas anime terlengkap yang didedikasikan untuk para penggemar budaya pop Jepang. Temukan serial baru, lacak progres tontonan Anda, baca ulasan, dan bergabunglah dalam diskusi bersama jutaan pecinta anime lainnya di seluruh dunia.
                        </p>
                        <div className="mt-2">
                            <a href="/about" className="inline-block px-6 py-2 border-2 border-indigo-400 text-indigo-100 hover:bg-indigo-400 hover:text-white font-semibold rounded-lg transition-colors">
                                Pelajari Lebih Lanjut
                            </a>
                        </div>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 w-full z-10">
                        <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <FontAwesomeIcon icon={faDatabase} className="text-3xl text-yellow-400 mb-2" />
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">15K+</div>
                            <div className="text-xs sm:text-sm text-sky-200 font-medium">Judul Anime</div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <FontAwesomeIcon icon={faUsers} className="text-3xl text-green-400 mb-2" />
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">2M+</div>
                            <div className="text-xs sm:text-sm text-sky-200 font-medium">Pengguna Aktif</div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <FontAwesomeIcon icon={faCommentDots} className="text-3xl text-pink-400 mb-2" />
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50M+</div>
                            <div className="text-xs sm:text-sm text-sky-200 font-medium">Ulasan & Rating</div>
                        </div>
                    </div>
                </div>
                {/* --- FOURTH END --- */}
                
            </div>
        </MainLayout>
    );
}