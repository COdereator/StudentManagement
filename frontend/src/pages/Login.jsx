import { useState } from "react";
import {
    GraduationCap,
    Users,
    BookOpen,
    ChartNoAxesCombined,
    ShieldCheck,
    Sparkles,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
} from "lucide-react";
import api from "../api/api";
import { useNavigate } from 'react-router-dom'

const roles = [
    { label: "Teacher", value: "teacher", icon: BookOpen },
    { label: "Student", value: "student", icon: GraduationCap },
];


const features = [
    {
        icon: Users,
        title: "Student records",
        description: "Keep student information organized.",
    },
    {
        icon: BookOpen,
        title: "Academic progress",
        description: "Manage classes, results, and attendance.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Smart insights",
        description: "Make better decisions with clear data.",
    },
];

export default function Login() {
    const [role, setRole] = useState("teacher");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);
        console.log(email,
            password,
            role,);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
                role,
            });



            if (response.data.result) {
                localStorage.setItem('token', response.data.token)
                navigate('/dashboard')
                setMessage(response.data.msg || "Login successful!");

            } else {
                setError(response.data.msg || "Login failed. Please try again.");
            }
        } catch (error) {
            setError(
                error.response?.data?.msg ||
                error.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="h-dvh overflow-hidden bg-slate-100 p-0 sm:p-3 lg:p-4">
            <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 overflow-y-auto bg-white shadow-xl shadow-blue-950/10 sm:rounded-2xl lg:grid-cols-2 lg:overflow-hidden">

                {/* LEFT: Welcome panel */}
                <section className="relative flex flex-col overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-6 py-6 text-white sm:px-8 lg:px-9 lg:py-6 xl:px-12">

                    {/* Decorative circles */}
                    <div className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-12 top-36 h-44 w-44 rounded-full border border-white/10" />

                    {/* Brand */}
                    <a
                        href="/"
                        className="relative z-10 flex w-fit items-center gap-3"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                            <GraduationCap size={26} />
                        </span>

                        <span className="text-lg font-bold tracking-tight">
                            EduManage
                            <span className="mt-0.5 block text-[9px] font-medium tracking-[2px] text-blue-200">
                                STUDENT MANAGEMENT
                            </span>
                        </span>
                    </a>

                    {/* Welcome content */}
                    <div className="relative z-10 my-auto py-7 lg:py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-widest">
                            <Sparkles size={14} />
                            YOUR CAMPUS, CONNECTED
                        </span>

                        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-4xl xl:text-5xl">
                            Education
                            <br />
                            management,
                            <br />
                            <span className="text-blue-200">made simple.</span>
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">
                            One place for student records, academic progress,
                            attendance, and everything your institution needs.
                        </p>

                        {/* Feature list */}
                        <div className="mt-6 space-y-4">
                            {features.map(({ icon: Icon, title, description }) => (
                                <div key={title} className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold">{title}</h3>
                                        <p className="mt-0.5 text-xs leading-5 text-blue-100">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel footer */}
                    <div className="relative z-10 flex items-center gap-2 text-[11px] text-blue-100">
                        <ShieldCheck size={16} />
                        Built for a smarter learning experience
                    </div>
                </section>

                {/* RIGHT: Login panel */}
                <section className="flex min-w-0 items-center justify-center px-5 py-7 sm:px-9 lg:px-8 lg:py-5 xl:px-12">
                    <div className="w-full max-w-md">

                        {/* Mobile brand */}
                        <div className="mb-5 flex items-center gap-2 text-lg font-bold text-blue-600 lg:hidden">
                            <GraduationCap size={26} />
                            EduManage
                        </div>

                        {/* Heading */}
                        <div className="mb-6">
                            <p className="text-[10px] font-bold tracking-[2px] text-blue-600">
                                WELCOME BACK
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                                Sign in to your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Enter your details to access your dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Role selector */}
                            <div>
                                <p className="mb-2 text-xs font-semibold text-slate-700">
                                    Sign in as
                                </p>

                                <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
                                    {roles.map(({ label, value, icon: Icon }) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setRole(value)}
                                            aria-pressed={role === value}
                                            className={`flex min-h-10 items-center justify-center gap-1.5 rounded-lg border px-1 py-2 text-xs font-semibold transition ${role === value
                                                ? "border-blue-100 bg-white text-blue-600 shadow-sm"
                                                : "border-transparent text-slate-500 hover:text-blue-600"
                                                }`}
                                        >
                                            <Icon size={15} />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                                >
                                    Email address
                                </label>

                                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                                    <Mail size={18} className="shrink-0 text-slate-400" />

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@school.edu"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full min-w-0 bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-1.5 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="password"
                                        className="text-xs font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>

                                    <a
                                        href="/forgot-password"
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                                    <LockKeyhole
                                        size={18}
                                        className="shrink-0 text-slate-400"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full min-w-0 bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="shrink-0 rounded-md p-1 text-slate-400 hover:text-blue-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <label className="flex w-fit cursor-pointer items-center gap-2 text-xs text-slate-500">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 accent-blue-600"
                                />
                                Remember me
                            </label>

                            {/* Feedback */}
                            {message && (
                                <p
                                    role="status"
                                    className="rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-700"
                                >
                                    {message}
                                </p>
                            )}
                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-lg bg-red-50 p-3 text-xs leading-5 text-red-700"
                                >
                                    {error}
                                </p>
                            )}
                            {/* Login button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in to your account"}
                            </button>

                            <p className="text-center text-xs leading-5 text-slate-500">
                                New here?{" "}
                                <a href="/register" className="font-semibold text-blue-600 hover:underline">
                                    Create an account
                                </a>
                            </p>
                        </form>

                        {/* Security note */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                            <ShieldCheck size={15} />
                            Your account is protected and secure.
                        </div>

                        {/* Footer */}
                        <footer className="mt-6 flex justify-between gap-3 text-[10px] text-slate-400">
                            <span>© {new Date().getFullYear()} EduManage</span>
                            <span>Made for better education.</span>
                        </footer>
                    </div>
                </section>
            </div>
        </main>
    );
}