import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import {
  faStar,
  faPlay,
  faShareNodes,
  faCircleCheck,
  faChevronDown,
  faComment,
  faThumbsUp,
  faThumbsDown,
  faReply,
  faPaperPlane,
  faCircleInfo,
  faUsers,
  faLayerGroup,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnimeDetailPageView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:3000/api/anime/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Anime tidak ditemukan");
        }
        const data = await response.json();
        setAnime(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error:", err);
          setError(err.message || "Gagal memuat data anime");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="w-full flex items-center justify-center py-24">
          <p className="text-sm text-gray-500">Memuat data anime...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="w-full flex flex-col items-center justify-center gap-4 py-24">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-blue-800 hover:underline"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Kembali
          </button>
        </div>
      </MainLayout>
    );
  }

  // Jaga-jaga kalau response sukses (200) tapi body-nya kosong/null.
  if (!anime) {
    return (
      <MainLayout>
        <div className="w-full flex items-center justify-center py-24">
          <p className="text-sm text-gray-500">Data anime tidak tersedia.</p>
        </div>
      </MainLayout>
    );
  }

  // Turunan dari hasil fetch. Pakai fallback supaya tidak crash kalau field
  // ini belum ada di response API kamu — sesuaikan nama field-nya
  // (mis. anime.recommendations) kalau berbeda dari yang di bawah ini.
  const characters = anime.characters ?? [];
  const relatedAnime = anime.relatedAnime ?? anime.recommendations ?? [];
  const comments = anime.comments ?? [];
  const totalComments = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);

  // Kolom-kolom di bawah ini persis mengikuti tabel `data_anime` pada migration:
  // id, title, japaneseTitle, image, rating, status, type, episodes,
  // duration, aired, season, year, genres, studio, source.
  // title, image, rating, dan genres sudah ditampilkan di bagian atas (poster,
  // heading, badge rating, dan chip genre), jadi tidak diulang di sini.
  const detailRows = [
    { label: "Judul Jepang", value: anime.japaneseTitle },
    { label: "Status", value: anime.status },
    { label: "Tipe", value: anime.type },
    { label: "Episode", value: anime.episodes },
    { label: "Durasi", value: anime.duration },
    { label: "Tayang", value: anime.aired },
    { label: "Musim", value: anime.season },
    { label: "Tahun", value: anime.year },
    { label: "Studio", value: anime.studio },
    { label: "Sumber", value: anime.source },
  ].filter((row) => row.value !== undefined && row.value !== null && row.value !== "");

  return (
    <MainLayout>
      <div className="w-full flex flex-col gap-6 pt-17 px-4 sm:px-8 pb-10">
        {/* Info utama */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col lg:flex-row gap-6">
          {/* Poster + aksi */}
          <div className="flex-shrink-0 w-40 sm:w-48 mx-auto lg:mx-0">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full aspect-[2/3] object-cover rounded-xl border border-gray-200"
            />
            <div className="mt-4 flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faPlay} />
                Watch Now
              </button>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-blue-800 hover:text-blue-800 transition-colors">
                  <FontAwesomeIcon icon={faBookmarkOutline} />
                  Save
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
            <p className="text-sm text-gray-500 mt-1">{anime.japaneseTitle}</p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5 text-yellow-500 font-semibold">
                <FontAwesomeIcon icon={faStar} />
                {anime.rating}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-medium">
                <FontAwesomeIcon icon={faCircleCheck} />
                {anime.status}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                {anime.type}
              </span>
              <span className="text-gray-500">{anime.year}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {(anime.genres ?? []).map((genre) => (
                <span key={genre} className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-medium">
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{anime.synopsis}</p>
              <button className="mt-1 text-sm font-medium text-blue-800 hover:underline flex items-center gap-1">
                Read more
                <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
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
        {characters.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faUsers} className="text-blue-800" />
              Karakter & Pengisi Suara
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {characters.map((char) => (
                <div key={char.id ?? char.name} className="flex-shrink-0 w-32 text-center">
                  <img src={char.image} alt={char.name} className="w-20 h-20 rounded-full mx-auto object-cover border border-gray-200" />
                  <p className="text-sm font-medium text-gray-800 mt-2 truncate">{char.name}</p>
                  <p className="text-xs text-gray-500">{char.role}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{char.va}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Komentar */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faComment} className="text-blue-800" />
              Komentar ({totalComments})
            </h3>
            <select
              defaultValue="newest"
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Terbaru</option>
              <option value="popular">Terpopuler</option>
            </select>
          </div>

          {/* Form komentar (tampilan saja) */}
          <div className="flex gap-3 mb-6">
            <img
              src="https://ui-avatars.com/api/?name=Kamu&background=1e3a8a&color=fff"
              alt="You"
              className="w-9 h-9 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                placeholder="Tulis komentar kamu tentang anime ini..."
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <div className="flex justify-end mt-2">
                <button className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Kirim
                </button>
              </div>
            </div>
          </div>

          {/* List komentar */}
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada komentar.</p>
          ) : (
            <div className="flex flex-col gap-5">
              {comments.map((comment) => (
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
                      <button className="flex items-center gap-1 hover:text-blue-800 transition-colors">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        {comment.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                        <FontAwesomeIcon icon={faThumbsDown} />
                        {comment.dislikes > 0 && comment.dislikes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-800 transition-colors">
                        <FontAwesomeIcon icon={faReply} />
                        Balas
                      </button>
                      {comment.replies?.length > 0 && (
                        <button className="flex items-center gap-1 text-blue-800 font-medium hover:underline">
                          Lihat {comment.replies.length} balasan
                          <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                        </button>
                      )}
                    </div>

                    {comment.replies?.length > 0 && (
                      <div className="flex flex-col gap-3 mt-3 pl-4 border-l-2 border-gray-100">
                        {comment.replies.map((reply) => (
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
                                <button className="flex items-center gap-1 hover:text-blue-800 transition-colors">
                                  <FontAwesomeIcon icon={faThumbsUp} />
                                  {reply.likes}
                                </button>
                                <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                  <FontAwesomeIcon icon={faThumbsDown} />
                                  {reply.dislikes > 0 && reply.dislikes}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rekomendasi anime terkait */}
        {relatedAnime.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faLayerGroup} className="text-blue-800" />
              Kamu Mungkin Juga Suka
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {relatedAnime.map((item) => (
                <div key={item.id ?? item.title} className="text-left group">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={item.cover ?? item.image} alt={item.title} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[10px]" />
                      {item.rating}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.episodes} Episode</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}