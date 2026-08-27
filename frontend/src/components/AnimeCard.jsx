import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";

/**
 * Kartu anime — dipakai untuk grid "New Anime", hasil pencarian, dsb.
 * Fokus: daftar anime (bukan pemutar video), jadi tanpa tombol play.
 *
 * Props:
 * - image     : string (wajib) - url/import gambar poster
 * - title     : string (wajib)
 * - rating    : number|string  - misal 8.7
 * - status    : string         - "Ongoing" | "Completed" | dll
 * - episodes  : number|string  - jumlah episode
 * - genres    : string[]       - kategori anime, hanya genres[0] yang ditampilkan
 * - href      : string         - link ke halaman detail
 * - saved     : boolean        - status awal tersimpan/tidak
 * - liked     : boolean        - status awal disukai/tidak
 * - onSave    : (nextSaved: boolean) => void
 * - onLike    : (nextLiked: boolean) => void
 */
export default function AnimeCard({
    image,
    title,
    rating,
    status,
    episodes,
    genres = [],
    href = "#",
    saved = false,
    liked = false,
    onSave,
    onLike,
}) {
    const [isSaved, setIsSaved] = useState(saved);
    const [isLiked, setIsLiked] = useState(liked);
    const category = genres[0];

    function handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const next = !isSaved;
        setIsSaved(next);
        onSave?.(next);
    }

    function handleLike(e) {
        e.preventDefault();
        e.stopPropagation();
        const next = !isLiked;
        setIsLiked(next);
        onLike?.(next);
    }

    return (
        <a
            href={href}
            className="anime-card group block w-67 shrink-0 rounded-xl overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-950/30"
        >
            {/* Poster */}
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-blue-950">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* gradient overlay biar teks kebaca */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/95 via-blue-950/15 to-transparent" />

                {/* badge status - kiri atas */}
                {status && (
                    <span className="absolute top-3 left-3 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-md">
                        {status}
                    </span>
                )}

                {/* info: rating, kategori, judul, episode */}
                <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                        {rating && (
                            <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                                <FontAwesomeIcon icon={faStar} className="text-xs" />
                                {rating}
                            </span>
                        )}
                        {category && (
                            <span className="text-[11px] border border-gray-400/60 text-sky-100 px-2 py-0.5 rounded-md">
                                {category}
                            </span>
                        )}
                    </div>
                    <h4 className="font-open-sans font-bold text-white text-base leading-tight line-clamp-2">
                        {title}
                    </h4>
                    {episodes && (
                        <span className="text-xs text-sky-200 font-medium">
                            {episodes} Eps
                        </span>
                    )}
                </div>
            </div>

            {/* Aksi: save & like - di bawah poster */}
            <div className="flex items-center gap-2 p-3 bg-blue-950">
                <button
                    type="button"
                    onClick={handleSave}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? "Hapus dari list" : "Simpan ke list"}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border text-xs font-semibold transition-colors duration-200 ${
                        isSaved
                            ? "bg-yellow-400 border-yellow-400 text-blue-950"
                            : "border-gray-400/50 text-sky-100 hover:bg-white/10"
                    }`}
                >
                    <FontAwesomeIcon icon={faBookmark} />
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleLike}
                    aria-pressed={isLiked}
                    aria-label={isLiked ? "Batal suka" : "Suka"}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border text-xs font-semibold transition-colors duration-200 ${
                        isLiked
                            ? "bg-pink-500 border-pink-500 text-white"
                            : "border-gray-400/50 text-sky-100 hover:bg-white/10"
                    }`}
                >
                    <FontAwesomeIcon icon={faHeart} />
                    Like
                </button>
            </div>
        </a>
    );
}