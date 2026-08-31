import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope, faLock, faEye, faEyeSlash, faUser, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import logoAnimeListNavy from "../../assets/logoAnimeListNavy.png";
import imgIntro from "../../assets/imgIntro.png";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({
        username: "", email: "", password: "", confirmPassword: "", agree: false
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    function validate() {
        const newErrors = {};
        if (!form.username) newErrors.username = "Nama pengguna wajib diisi";
        else if (form.username.length < 3) newErrors.username = "Minimal 3 karakter";

        if (!form.email) newErrors.email = "Email wajib diisi";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";

        if (!form.password) newErrors.password = "Kata sandi wajib diisi";
        else if (form.password.length < 8) newErrors.password = "Kata sandi minimal 8 karakter";

        if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Konfirmasi kata sandi tidak cocok";

        if (!form.agree) newErrors.agree = "Kamu harus menyetujui Syarat & Ketentuan";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        try {
            // TODO: sambungkan ke endpoint autentikasi (mis. POST /api/auth/register)
            console.log("Register submitted:", form);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-gray-50">
            {/* LEFT: Branding panel — disembunyikan di layar kecil */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-t from-blue-900 to-blue-950 flex-col justify-between p-12 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
                </div>

                <a href="/" className="flex items-center gap-4 z-10 w-fit">
                    <div className="w-12 shrink-0 bg-white p-2 rounded-xl shadow-md">
                        <img src={logoAnimeListNavy} alt="AnimeList logo" className="w-full" />
                    </div>
                    <h4 className="font-bold text-2xl font-montserrat text-white">AnimeList</h4>
                </a>

                <div className="z-10 text-sky-100">
                    <h3 className="font-extrabold font-open-sans text-4xl xl:text-5xl leading-tight mb-4 text-white">
                        Gabung Bersama <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Komunitas</span>
                    </h3>
                    <p className="text-sky-200/90 text-base xl:text-lg max-w-md">
                        Buat akun gratis untuk menyimpan daftar tontonan, memberi rating, dan menulis ulasan anime favoritmu.
                    </p>
                </div>

                <img src={imgIntro} alt="Featured anime artwork" className="z-10 w-64 xl:w-80 mx-auto drop-shadow-2xl" />
            </div>

            {/* RIGHT: Form panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-12">
                <div className="w-full max-w-md">
                    <a href="/" className="lg:hidden flex items-center gap-3 mb-8 justify-center w-fit mx-auto">
                        <div className="w-10 shrink-0 bg-blue-950 p-2 rounded-xl shadow-md">
                            <img src={logoAnimeListNavy} alt="AnimeList logo" className="w-full" />
                        </div>
                        <h4 className="font-bold text-xl font-montserrat text-gray-800">AnimeList</h4>
                    </a>

                    <h2 className="font-extrabold font-montserrat text-3xl text-gray-800 mb-2">Buat Akun Baru</h2>
                    <p className="text-gray-500 mb-8">
                        Sudah punya akun?{" "}
                        <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-800">Masuk di sini</a>
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Pengguna</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="mis. otakuwibu99"
                                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${errors.username ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                />
                            </div>
                            {errors.username && <p className="text-red-500 text-xs mt-1.5">{errors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="nama@email.com"
                                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${errors.email ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Kata Sandi</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Minimal 8 karakter"
                                    className={`w-full pl-11 pr-11 py-3 rounded-lg border ${errors.password ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">Konfirmasi Kata Sandi</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Ulangi kata sandi"
                                    className={`w-full pl-11 pr-11 py-3 rounded-lg border ${errors.confirmPassword ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showConfirm ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                >
                                    <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword}</p>}
                        </div>

                        <div>
                            <label className="flex items-start gap-2 text-sm text-gray-600 select-none cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={form.agree}
                                    onChange={handleChange}
                                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                                />
                                <span>
                                    Saya menyetujui{" "}
                                    <a href="/terms" className="text-indigo-600 font-semibold hover:text-indigo-800">Syarat & Ketentuan</a>{" "}
                                    dan{" "}
                                    <a href="/privacy" className="text-indigo-600 font-semibold hover:text-indigo-800">Kebijakan Privasi</a>
                                </span>
                            </label>
                            {errors.agree && <p className="text-red-500 text-xs mt-1.5">{errors.agree}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3 text-lg font-bold bg-gradient-to-r from-indigo-500 hover:from-indigo-600 hover:to-purple-600 to-purple-500 rounded-lg text-white shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            <FontAwesomeIcon icon={faUserPlus} /> {submitting ? "Memproses..." : "Daftar"}
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-gray-400 text-sm">atau daftar dengan</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <FontAwesomeIcon icon={faGoogle} /> Google
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <FontAwesomeIcon icon={faGithub} /> GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}