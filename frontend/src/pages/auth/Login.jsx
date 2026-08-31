import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope, faLock, faEye, faEyeSlash, faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import logoAnimeListNavy from "../../assets/logoAnimeListNavy.png";
import imgIntro from "../../assets/imgIntro.png";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    function validate() {
        const newErrors = {};
        if (!form.email) newErrors.email = "Email wajib diisi";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";
        if (!form.password) newErrors.password = "Kata sandi wajib diisi";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        try {
            // TODO: sambungkan ke endpoint autentikasi (mis. POST /api/auth/login)
            console.log("Login submitted:", form);
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
                        Selamat Datang <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Kembali</span>
                    </h3>
                    <p className="text-sky-200/90 text-base xl:text-lg max-w-md">
                        Masuk untuk melanjutkan daftar tontonan, memberi rating, dan ikut diskusi bersama jutaan penggemar anime lainnya.
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

                    <h2 className="font-extrabold font-montserrat text-3xl text-gray-800 mb-2">Masuk ke Akun</h2>
                    <p className="text-gray-500 mb-8">
                        Belum punya akun?{" "}
                        <a href="/register" className="text-indigo-600 font-semibold hover:text-indigo-800">Daftar di sini</a>
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Kata Sandi</label>
                                <a href="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Lupa kata sandi?</a>
                            </div>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Masukkan kata sandi"
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

                        <label className="flex items-center gap-2 text-sm text-gray-600 select-none cursor-pointer w-fit">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            Ingat saya
                        </label>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3 text-lg font-bold bg-gradient-to-r from-indigo-500 hover:from-indigo-600 hover:to-purple-600 to-purple-500 rounded-lg text-white shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            <FontAwesomeIcon icon={faRightToBracket} /> {submitting ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-gray-400 text-sm">atau lanjutkan dengan</span>
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