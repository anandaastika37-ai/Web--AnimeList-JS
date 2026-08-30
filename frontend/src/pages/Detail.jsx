import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import {
  faStar,
  faPlay,
  faBookmark,
  faShareNodes,
  faCircleCheck,
  faChevronDown,
  faChevronUp,
  faComment,
  faThumbsUp,
  faThumbsDown,
  faReply,
  faPaperPlane,
  faCircleInfo,
  faUsers,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";

// ================= DUMMY DATA =================

const anime = {
  title: "Jujutsu Kaisen",
  altTitle: "呪術廻戦",
  englishTitle: "Jujutsu Kaisen",
  synonyms: "Sorcery Fight",
  cover: "https://via.placeholder.com/300x420",
  type: "TV",
  status: "Ongoing",
  score: 8.63,
  ranked: "#112",
  popularity: "#3",
  members: "1,842,203",
  favorites: "98,120",
  episodesCount: 24,
  duration: "24 min per episode",
  releaseYear: 2023,
  aired: "Jul 6, 2023 - Dec 21, 2023",
  premiered: "Summer 2023",
  broadcast: "Kamis, 00:00 (WIB)",
  studio: "MAPPA",
  producers: "Shueisha, Nippon Television, VAP",
  licensors: "Crunchyroll",
  source: "Manga",
  ageRating: "R-17+ (violence & profanity)",
  genres: ["Action", "Fantasy", "Horror", "Supernatural"],
  themes: ["School", "Shounen", "Gore"],
  synopsis:
    "Yuji Itadori adalah siswa SMA dengan kekuatan fisik luar biasa yang bergabung dengan klub okultisme sekadar untuk bersenang-senang. Namun hidupnya berubah drastis saat ia menelan sebuah jari terkutuk untuk menyelamatkan teman-temannya, dan menjadi wadah bagi salah satu kutukan terkuat: Sukuna Ryomen.",
};

const characters = [
  { name: "Yuji Itadori", role: "Main", va: "Junya Enoki", image: "https://ui-avatars.com/api/?name=Yuji+Itadori&background=1e3a8a&color=fff" },
  { name: "Megumi Fushiguro", role: "Main", va: "Yuma Uchida", image: "https://ui-avatars.com/api/?name=Megumi+Fushiguro&background=1e3a8a&color=fff" },
  { name: "Nobara Kugisaki", role: "Main", va: "Asami Seto", image: "https://ui-avatars.com/api/?name=Nobara+Kugisaki&background=1e3a8a&color=fff" },
  { name: "Satoru Gojo", role: "Supporting", va: "Yuichi Nakamura", image: "https://ui-avatars.com/api/?name=Satoru+Gojo&background=1e3a8a&color=fff" },
  { name: "Sukuna Ryomen", role: "Supporting", va: "Junichi Suwabe", image: "https://ui-avatars.com/api/?name=Sukuna+Ryomen&background=1e3a8a&color=fff" },
];

const relatedAnime = [
  { title: "Chainsaw Man", cover: "https://via.placeholder.com/220x300", rating: 8.5, episodes: 12 },
  { title: "Tokyo Revengers", cover: "https://via.placeholder.com/220x300", rating: 8.1, episodes: 24 },
  { title: "Demon Slayer", cover: "https://via.placeholder.com/220x300", rating: 8.7, episodes: 26 },
  { title: "Mob Psycho 100", cover: "https://via.placeholder.com/220x300", rating: 8.6, episodes: 12 },
  { title: "Hell's Paradise", cover: "https://via.placeholder.com/220x300", rating: 8.0, episodes: 13 },
];

const initialComments = [
  {
    id: 1,
    user: "Rasyid Pratama",
    avatar: "https://ui-avatars.com/api/?name=Rasyid+Pratama&background=random",
    content: "Season ini gila sih, animasi fight scene-nya niat banget. MAPPA emang gak main-main kalau soal shounen.",
    createdAt: "2 jam lalu",
    likes: 128,
    dislikes: 3,
    replies: [
      {
        id: 101,
        user: "Dewi Anjani",
        avatar: "https://ui-avatars.com/api/?name=Dewi+Anjani&background=random",
        content: "Setuju banget, episode 3 bikin merinding pas fight-nya!",
        createdAt: "1 jam lalu",
        likes: 14,
        dislikes: 0,
      },
    ],
  },
  {
    id: 2,
    user: "Bagus Setiawan",
    avatar: "https://ui-avatars.com/api/?name=Bagus+Setiawan&background=random",
    content: "Kapan rilis episode selanjutnya ya? Udah gak sabar nunggu minggu depan.",
    createdAt: "5 jam lalu",
    likes: 42,
    dislikes: 1,
    replies: [],
  },
  {
    id: 3,
    user: "Intan Permata",
    avatar: "https://ui-avatars.com/api/?name=Intan+Permata&background=random",
    content: "Character development Megumi di arc ini keren banget, gak nyangka bakal sedalam ini.",
    createdAt: "1 hari lalu",
    likes: 76,
    dislikes: 2,
    replies: [
      {
        id: 102,
        user: "Yoga Firmansyah",
        avatar: "https://ui-avatars.com/api/?name=Yoga+Firmansyah&background=random",
        content: "Bener, dari season 1 emang udah keliatan sih potensinya.",
        createdAt: "20 jam lalu",
        likes: 9,
        dislikes: 0,
      },
      {
        id: 103,
        user: "Nadia Ramadhani",
        avatar: "https://ui-avatars.com/api/?name=Nadia+Ramadhani&background=random",
        content: "Sad banget pas part itu huhu 😭",
        createdAt: "18 jam lalu",
        likes: 5,
        dislikes: 0,
      },
    ],
  },
];

// ================= COMPONENT =================

export default function AnimeDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [commentSort, setCommentSort] = useState("newest");
  const [likedIds, setLikedIds] = useState([]);
  const [dislikedIds, setDislikedIds] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [expandedReplies, setExpandedReplies] = useState([]);

  const totalComments = useMemo(
    () => comments.reduce((sum, c) => sum + 1 + c.replies.length, 0),
    [comments]
  );

  const sortedComments = useMemo(() => {
    const list = [...comments];
    if (commentSort === "popular") list.sort((a, b) => b.likes - a.likes);
    return list;
  }, [comments, commentSort]);

  const toggleLike = (id, isReply = false, parentId = null) => {
    const key = isReply ? `${parentId}-${id}` : `${id}`;
    const isLiked = likedIds.includes(key);

    setComments((prev) =>
      prev.map((c) => {
        if (!isReply && c.id === id) return { ...c, likes: isLiked ? c.likes - 1 : c.likes + 1 };
        if (isReply && c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === id ? { ...r, likes: isLiked ? r.likes - 1 : r.likes + 1 } : r
            ),
          };
        }
        return c;
      })
    );

    setLikedIds((prev) => (isLiked ? prev.filter((k) => k !== key) : [...prev, key]));
    if (dislikedIds.includes(key)) setDislikedIds((prev) => prev.filter((k) => k !== key));
  };

  const toggleDislike = (id, isReply = false, parentId = null) => {
    const key = isReply ? `${parentId}-${id}` : `${id}`;
    const isDisliked = dislikedIds.includes(key);

    setComments((prev) =>
      prev.map((c) => {
        if (!isReply && c.id === id) return { ...c, dislikes: isDisliked ? c.dislikes - 1 : c.dislikes + 1 };
        if (isReply && c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === id ? { ...r, dislikes: isDisliked ? r.dislikes - 1 : r.dislikes + 1 } : r
            ),
          };
        }
        return c;
      })
    );

    setDislikedIds((prev) => (isDisliked ? prev.filter((k) => k !== key) : [...prev, key]));
    if (likedIds.includes(key)) setLikedIds((prev) => prev.filter((k) => k !== key));
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setComments((prev) => [
      {
        id: Date.now(),
        user: "Kamu",
        avatar: "https://ui-avatars.com/api/?name=Kamu&background=1e3a8a&color=fff",
        content: commentText.trim(),
        createdAt: "Baru saja",
        likes: 0,
        dislikes: 0,
        replies: [],
      },
      ...prev,
    ]);
    setCommentText("");
  };

  const handlePostReply = (parentId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      user: "Kamu",
      avatar: "https://ui-avatars.com/api/?name=Kamu&background=1e3a8a&color=fff",
      content: replyText.trim(),
      createdAt: "Baru saja",
      likes: 0,
      dislikes: 0,
    };

    setComments((prev) =>
      prev.map((c) => (c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c))
    );
    setExpandedReplies((prev) => (prev.includes(parentId) ? prev : [...prev, parentId]));
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleReplies = (id) => {
    setExpandedReplies((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const detailRows = [
    { label: "Judul Inggris", value: anime.englishTitle },
    { label: "Sinonim", value: anime.synonyms },
    { label: "Tipe", value: anime.type },
    { label: "Episode", value: anime.episodesCount },
    { label: "Durasi", value: anime.duration },
    { label: "Tayang", value: anime.aired },
    { label: "Musim", value: anime.premiered },
    { label: "Jadwal Rilis", value: anime.broadcast },
    { label: "Studio", value: anime.studio },
    { label: "Produser", value: anime.producers },
    { label: "Lisensi", value: anime.licensors },
    { label: "Sumber", value: anime.source },
    { label: "Rating Usia", value: anime.ageRating },
    { label: "Ranked", value: anime.ranked },
    { label: "Popularity", value: anime.popularity },
    { label: "Members", value: anime.members },
    { label: "Favorites", value: anime.favorites },
  ];

  return (
    <MainLayout>
      <div className="w-full flex flex-col gap-6 pt-17 px-4 sm:px-8 pb-10">
        {/* Info utama */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col lg:flex-row gap-6">
          {/* Poster + aksi */}
          <div className="flex-shrink-0 w-40 sm:w-48 mx-auto lg:mx-0">
            <img
              src={anime.cover}
              alt={anime.title}
              className="w-full aspect-[2/3] object-cover rounded-xl border border-gray-200"
            />
            <div className="mt-4 flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faPlay} />
                Watch Now
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite((prev) => !prev)}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-lg border transition-colors ${
                    isFavorite
                      ? "bg-blue-50 border-blue-800 text-blue-800"
                      : "border-gray-300 text-gray-600 hover:border-blue-800 hover:text-blue-800"
                  }`}
                >
                  <FontAwesomeIcon icon={isFavorite ? faBookmark : faBookmarkOutline} />
                  {isFavorite ? "Saved" : "Save"}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition-colors">
                  <FontAwesomeIcon icon={faShareNodes} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{anime.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{anime.altTitle}</p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5 text-yellow-500 font-semibold">
                <FontAwesomeIcon icon={faStar} />
                {anime.score}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-medium">
                <FontAwesomeIcon icon={faCircleCheck} />
                {anime.status}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                {anime.type}
              </span>
              <span className="text-gray-500">{anime.releaseYear}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {anime.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-medium">
                  {genre}
                </span>
              ))}
              {anime.themes.map((theme) => (
                <span key={theme} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                  {theme}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <p className={`text-sm text-gray-600 leading-relaxed ${!showFullSynopsis && "line-clamp-3"}`}>
                {anime.synopsis}
              </p>
              <button
                onClick={() => setShowFullSynopsis((prev) => !prev)}
                className="mt-1 text-sm font-medium text-blue-800 hover:underline flex items-center gap-1"
              >
                {showFullSynopsis ? "Show less" : "Read more"}
                <FontAwesomeIcon icon={showFullSynopsis ? faChevronUp : faChevronDown} className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabel info detail */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faCircleInfo} className="text-blue-800" />
            Informasi Detail
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {detailRows.map((row) => (
              <div key={row.label} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                <dt className="text-gray-500">{row.label}</dt>
                <dd className="text-gray-800 font-medium text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Karakter & Voice Actor */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} className="text-blue-800" />
            Karakter & Pengisi Suara
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {characters.map((char) => (
              <div key={char.name} className="flex-shrink-0 w-32 text-center">
                <img src={char.image} alt={char.name} className="w-20 h-20 rounded-full mx-auto object-cover border border-gray-200" />
                <p className="text-sm font-medium text-gray-800 mt-2 truncate">{char.name}</p>
                <p className="text-xs text-gray-500">{char.role}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{char.va}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Komentar */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faComment} className="text-blue-800" />
              Komentar ({totalComments})
            </h3>
            <select
              value={commentSort}
              onChange={(e) => setCommentSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Terbaru</option>
              <option value="popular">Terpopuler</option>
            </select>
          </div>

          {/* Form komentar */}
          <form onSubmit={handlePostComment} className="flex gap-3 mb-6">
            <img
              src="https://ui-avatars.com/api/?name=Kamu&background=1e3a8a&color=fff"
              alt="You"
              className="w-9 h-9 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tulis komentar kamu tentang anime ini..."
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Kirim
                </button>
              </div>
            </div>
          </form>

          {/* List komentar */}
          <div className="flex flex-col gap-5">
            {sortedComments.map((comment) => {
              const key = `${comment.id}`;
              const isLiked = likedIds.includes(key);
              const isDisliked = dislikedIds.includes(key);
              const repliesOpen = expandedReplies.includes(comment.id);

              return (
                <div key={comment.id} className="flex gap-3">
                  <img src={comment.avatar} alt={comment.user} className="w-9 h-9 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800">{comment.user}</p>
                        <span className="text-xs text-gray-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-1.5 px-1 text-xs text-gray-500">
                      <button
                        onClick={() => toggleLike(comment.id)}
                        className={`flex items-center gap-1 hover:text-blue-800 transition-colors ${isLiked && "text-blue-800 font-medium"}`}
                      >
                        <FontAwesomeIcon icon={faThumbsUp} />
                        {comment.likes}
                      </button>
                      <button
                        onClick={() => toggleDislike(comment.id)}
                        className={`flex items-center gap-1 hover:text-red-600 transition-colors ${isDisliked && "text-red-600 font-medium"}`}
                      >
                        <FontAwesomeIcon icon={faThumbsDown} />
                        {comment.dislikes > 0 && comment.dislikes}
                      </button>
                      <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="flex items-center gap-1 hover:text-blue-800 transition-colors"
                      >
                        <FontAwesomeIcon icon={faReply} />
                        Balas
                      </button>
                      {comment.replies.length > 0 && (
                        <button
                          onClick={() => toggleReplies(comment.id)}
                          className="flex items-center gap-1 text-blue-800 font-medium hover:underline"
                        >
                          {repliesOpen ? "Sembunyikan" : "Lihat"} {comment.replies.length} balasan
                          <FontAwesomeIcon icon={repliesOpen ? faChevronUp : faChevronDown} className="text-xs" />
                        </button>
                      )}
                    </div>

                    {replyingTo === comment.id && (
                      <div className="flex gap-2 mt-3">
                        <img
                          src="https://ui-avatars.com/api/?name=Kamu&background=1e3a8a&color=fff"
                          alt="You"
                          className="w-7 h-7 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Balas ${comment.user}...`}
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <div className="flex justify-end gap-2 mt-1.5">
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                            >
                              Batal
                            </button>
                            <button
                              onClick={() => handlePostReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="text-xs bg-blue-800 hover:bg-blue-900 disabled:bg-gray-300 text-white font-medium px-3 py-1 rounded-lg transition-colors"
                            >
                              Kirim
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {repliesOpen && comment.replies.length > 0 && (
                      <div className="flex flex-col gap-3 mt-3 pl-4 border-l-2 border-gray-100">
                        {comment.replies.map((reply) => {
                          const rKey = `${comment.id}-${reply.id}`;
                          const rLiked = likedIds.includes(rKey);
                          const rDisliked = dislikedIds.includes(rKey);

                          return (
                            <div key={reply.id} className="flex gap-2">
                              <img src={reply.avatar} alt={reply.user} className="w-7 h-7 rounded-full flex-shrink-0" />
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-800">{reply.user}</p>
                                    <span className="text-xs text-gray-400">{reply.createdAt}</span>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                                </div>
                                <div className="flex items-center gap-4 mt-1.5 px-1 text-xs text-gray-500">
                                  <button
                                    onClick={() => toggleLike(reply.id, true, comment.id)}
                                    className={`flex items-center gap-1 hover:text-blue-800 transition-colors ${rLiked && "text-blue-800 font-medium"}`}
                                  >
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    {reply.likes}
                                  </button>
                                  <button
                                    onClick={() => toggleDislike(reply.id, true, comment.id)}
                                    className={`flex items-center gap-1 hover:text-red-600 transition-colors ${rDisliked && "text-red-600 font-medium"}`}
                                  >
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                    {reply.dislikes > 0 && reply.dislikes}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rekomendasi anime terkait */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faLayerGroup} className="text-blue-800" />
            Kamu Mungkin Juga Suka
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {relatedAnime.map((item) => (
              <button key={item.title} className="text-left group">
                <div className="relative rounded-lg overflow-hidden">
                  <img src={item.cover} alt={item.title} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[10px]" />
                    {item.rating}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 mt-2 truncate">{item.title}</p>
                <p className="text-xs text-gray-500">{item.episodes} Episode</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}