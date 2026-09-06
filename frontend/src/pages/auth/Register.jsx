import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
  faUserPlus,
  faBookmark,
  faStar,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import logoAnimeListNavy from "../../assets/logoAnimeListNavy.png";
import imgIntro from "../../assets/imgIntro.png";

// Faint halftone-dot texture for the backdrop — matches the login screen
// so both auth pages read as one visual system.
const dotPatternStyle = {
  backgroundImage:
    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0)",
  backgroundSize: "22px 22px",
};

const FEATURES = [
  { icon: faBookmark, label: "Lacak progres nonton episode demi episode" },
  { icon: faStar, label: "Beri rating dan ulasan untuk tiap judul" },
  { icon: faComments, label: "Diskusi bareng ribuan penggemar lain" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    const newErrors = {};
    if (!form.username) newErrors.username = "Nama pengguna wajib diisi";
    else if (form.username.length < 3)
      newErrors.username = "Minimal 3 karakter";

    if (!form.email) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Format email tidak valid";

    if (!form.password) newErrors.password = "Kata sandi wajib diisi";
    else if (form.password.length < 8)
      newErrors.password = "Kata sandi minimal 8 karakter";

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Konfirmasi kata sandi tidak cocok";

    if (!form.agree)
      newErrors.agree = "Kamu harus menyetujui Syarat & Ketentuan";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      console.log("Response backend:", data);

      if (!response.ok) {
        setErrors({
          server: data.message || "Registrasi gagal",
        });

        return;
      }

      // Registrasi berhasil
      alert("Registrasi berhasil!");

      // Kosongkan form
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });

      // Arahkan ke halaman login
      window.location.href = "/login";
    } catch (error) {
      console.error("Error register:", error);

      setErrors({
        server: "Tidak dapat terhubung ke server",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B1330] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Ambient backdrop: halftone texture + soft color glows */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={dotPatternStyle}
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-fuchsia-500/25 rounded-full blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-16 w-[30rem] h-[30rem] bg-violet-600/25 rounded-full blur-[130px]"
      />

      {/* The card: one elevated auth surface, split into brand + form */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-[1fr_1.05fr] rounded-[28px] overflow-hidden bg-white ring-1 ring-white/10 shadow-[0_40px_120px_-25px_rgba(124,58,237,0.55)]">
        {/* RIGHT-turned-LEFT on desktop: Form panel comes first in markup on mobile stacking, so keep form always visible and brand panel as a true left column on lg screens */}
        <div className="hidden lg:flex relative flex-col justify-between p-12 bg-gradient-to-br from-[#0B1330] via-[#161d42] to-[#241b4d] overflow-hidden order-1">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={dotPatternStyle}
          />

          <a href="/" className="relative flex items-center gap-4 w-fit">
            <div className="w-12 shrink-0 bg-white p-2 rounded-xl shadow-md">
              <img
                src={logoAnimeListNavy}
                alt="AnimeList logo"
                className="w-full"
              />
            </div>
            <h4 className="font-bold text-2xl font-montserrat text-white">
              AnimeList
            </h4>
          </a>

          <div className="relative">
            <h3 className="font-open-sans font-extrabold text-4xl xl:text-[2.75rem] leading-[1.15] text-white mb-4">
              Ceritamu baru dimulai.
            </h3>
            <p className="text-sky-200/80 text-base xl:text-lg max-w-md leading-relaxed">
              Buat akun gratis untuk menyimpan daftar tontonan, memberi rating,
              dan menulis ulasan anime favoritmu.
            </p>

            <ul className="mt-8 space-y-4">
              {FEATURES.map((feature) => (
                <li key={feature.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="text-violet-300 text-sm"
                    />
                  </span>
                  <span className="text-sm text-sky-100/90">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-x-8 bottom-4 h-24 bg-violet-500/30 blur-3xl rounded-full"
            />
            <img
              src={imgIntro}
              alt="Featured anime artwork"
              className="relative w-56 xl:w-64 mx-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center px-6 sm:px-10 py-10 order-2">
          <a href="/" className="lg:hidden flex items-center gap-3 mb-6 w-fit">
            <div className="w-10 shrink-0 bg-[#0B1330] p-2 rounded-xl shadow-sm">
              <img
                src={logoAnimeListNavy}
                alt="AnimeList logo"
                className="w-full"
              />
            </div>
            <span className="font-bold text-lg font-montserrat text-slate-900">
              AnimeList
            </span>
          </a>

          <h2 className="font-extrabold font-montserrat text-3xl text-slate-900 mb-2">
            Buat Akun Baru
          </h2>
          <p className="text-slate-500 mb-6 text-[15px]">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-violet-600 font-semibold hover:text-violet-700"
            >
              Masuk di sini
            </a>
          </p>

          <form
            onSubmit={handleSubmit}
            method="post"
            action={"/home"}
            className="flex flex-col gap-4"
            noValidate
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Nama Pengguna
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="mis. otakuwibu99"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/10 ${errors.username ? "border-rose-400" : "border-slate-200 focus:border-violet-500"}`}
                />
              </div>
              {errors.username && (
                <p className="text-rose-500 text-xs mt-1.5">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/10 ${errors.email ? "border-rose-400" : "border-slate-200 focus:border-violet-500"}`}
                />
              </div>
              {errors.email && (
                <p className="text-rose-500 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/10 ${errors.password ? "border-rose-400" : "border-slate-200 focus:border-violet-500"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 text-xs mt-1.5">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi kata sandi"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-4 focus:ring-violet-500/10 ${errors.confirmPassword ? "border-rose-400" : "border-slate-200 focus:border-violet-500"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showConfirm
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-rose-500 text-xs mt-1.5">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 text-sm text-slate-600 select-none cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-violet-600 focus:ring-violet-500 shrink-0"
                />
                <span>
                  Saya menyetujui{" "}
                  <a
                    href="/terms"
                    className="text-violet-600 font-semibold hover:text-violet-700"
                  >
                    Syarat & Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a
                    href="/privacy"
                    className="text-violet-600 font-semibold hover:text-violet-700"
                  >
                    Kebijakan Privasi
                  </a>
                </span>
              </label>
              {errors.agree && (
                <p className="text-rose-500 text-xs mt-1.5">{errors.agree}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 mt-1 text-[15px] font-bold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 shadow-lg shadow-violet-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <FontAwesomeIcon icon={faUserPlus} />{" "}
              {submitting ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-sm">atau daftar dengan</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
