import { useState } from "react";
import axios from 'axios'
import {
    GraduationCap,
    BookOpen,
    ShieldCheck,
    Sparkles,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    User,
    Phone,
    Check,
} from "lucide-react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

// Admin yahan nahi hai: admin account public form se nahi banna chahiye.
const roles = [
    { label: "Student", value: "student", icon: GraduationCap },
    { label: "Teacher", value: "teacher", icon: BookOpen },
];

const steps = [
    { title: "Create your account", description: "Fill in your basic details." },
    { title: "Get approved", description: "The institute confirms your account." },
    { title: "Start learning", description: "Access classes, attendance and results." },
];

const inputWrap =
    "flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10";
const inputCls =
    "w-full min-w-0 bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400";
const labelCls = "mb-1.5 block text-xs font-semibold text-slate-700";

function passwordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0 to 4
}

const strengthMeta = [
    { label: "Too short", color: "bg-slate-200" },
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-amber-500" },
    { label: "Good", color: "bg-blue-500" },
    { label: "Strong", color: "bg-green-500" },
];


export default function Register() {
    const [role, setRole] = useState("student");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
    const strength = passwordStrength(form.password);
    const mismatch = form.confirm && form.password !== form.confirm;
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setMessage("");

        if (form.password.length < 6) {
            return setError("Password must be at least 6 characters.");
        }
        if (form.password !== form.confirm) {
            return setError("Passwords do not match.");
        }
        if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) {
            return setError("Enter a valid phone number.");
        }
        if (!agree) {
            return setError("Please accept the terms to continue.");
        }

        try {
            const response = await api.post('/auth/register', {
                name: form.name,
                email: form.email,
                number: form.phone,
                password: form.password,
                role
            })

            if (response.data.result) {
                setMessage(response.data?.msg)
                navigate('/login')
            }
        } catch (error) {
            if (error.response) {
                setError(
                    error.response.data?.msg ||
                    "Registration failed. Please try again."
                );
            }
        }
    }

    return (
        <main className="h-dvh overflow-hidden bg-slate-100 p-0 sm:p-3 lg:p-4">
            <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 overflow-y-auto bg-white shadow-xl shadow-blue-950/10 sm:rounded-2xl lg:grid-cols-2 lg:overflow-hidden">

                {/* LEFT: Welcome panel */}
                <section className="relative flex flex-col overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-6 py-6 text-white sm:px-8 lg:px-9 lg:py-6 xl:px-12">
                    <div className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-12 top-36 h-44 w-44 rounded-full border border-white/10" />

                    <a href="/" className="relative z-10 flex w-fit items-center gap-3">
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

                    <div className="relative z-10 my-auto py-7 lg:py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-widest">
                            <Sparkles size={14} />
                            JOIN YOUR CAMPUS
                        </span>

                        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-4xl xl:text-5xl">
                            Create your
                            <br />
                            account in
                            <br />
                            <span className="text-blue-200">just a minute.</span>
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">
                            Register once and get access to classes, attendance,
                            schedules and progress, all in one place.
                        </p>

                        <div className="mt-6 space-y-4">
                            {steps.map(({ title, description }, i) => (
                                <div key={title} className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-sm font-bold">
                                        {i + 1}
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

                    <div className="relative z-10 flex items-center gap-2 text-[11px] text-blue-100">
                        <ShieldCheck size={16} />
                        Built for a smarter learning experience
                    </div>
                </section>

                {/* RIGHT: Register panel */}
                <section className="flex min-w-0 items-center justify-center px-5 py-7 sm:px-9 lg:overflow-y-auto lg:px-8 lg:py-5 xl:px-12">
                    <div className="w-full max-w-md">

                        <div className="mb-5 flex items-center gap-2 text-lg font-bold text-blue-600 lg:hidden">
                            <GraduationCap size={26} />
                            EduManage
                        </div>

                        <div className="mb-5">
                            <p className="text-[10px] font-bold tracking-[2px] text-blue-600">
                                GET STARTED
                            </p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                                Create your account
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3.5">

                            {/* Role selector */}
                            <div>
                                <p className="mb-2 text-xs font-semibold text-slate-700">
                                    Register as
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

                            {/* Full name */}
                            <div>
                                <label htmlFor="name" className={labelCls}>Full name</label>
                                <div className={inputWrap}>
                                    <User size={18} className="shrink-0 text-slate-400" />
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your full name"
                                        autoComplete="name"
                                        value={form.name}
                                        onChange={set("name")}
                                        required
                                        className={inputCls}
                                    />
                                </div>
                            </div>

                            {/* Email + Phone */}
                            <div className="grid gap-3.5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="email" className={labelCls}>Email address</label>
                                    <div className={inputWrap}>
                                        <Mail size={18} className="shrink-0 text-slate-400" />
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="you@school.edu"
                                            autoComplete="email"
                                            value={form.email}
                                            onChange={set("email")}
                                            required
                                            className={inputCls}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className={labelCls}>Phone number</label>
                                    <div className={inputWrap}>
                                        <Phone size={18} className="shrink-0 text-slate-400" />
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="98765 43210"
                                            autoComplete="tel"
                                            value={form.phone}
                                            onChange={set("phone")}
                                            required
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className={labelCls}>Password</label>
                                <div className={inputWrap}>
                                    <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        value={form.password}
                                        onChange={set("password")}
                                        required
                                        minLength={6}
                                        className={inputCls}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="shrink-0 rounded-md p-1 text-slate-400 hover:text-blue-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {form.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((n) => (
                                                <span
                                                    key={n}
                                                    className={`h-1 flex-1 rounded-full ${n <= strength ? strengthMeta[strength].color : "bg-slate-200"}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="mt-1 text-[11px] text-slate-500">
                                            Strength: {strengthMeta[strength].label}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label htmlFor="confirm" className={labelCls}>Confirm password</label>
                                <div
                                    className={`${inputWrap} ${mismatch ? "!border-red-400" : ""}`}
                                >
                                    <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                                    <input
                                        id="confirm"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Re-enter your password"
                                        autoComplete="new-password"
                                        value={form.confirm}
                                        onChange={set("confirm")}
                                        required
                                        className={inputCls}
                                    />
                                    {form.confirm && !mismatch && (
                                        <Check size={18} className="shrink-0 text-green-500" />
                                    )}
                                </div>
                                {mismatch && (
                                    <p className="mt-1 text-[11px] text-red-500">Passwords do not match.</p>
                                )}
                            </div>

                            {/* Terms */}
                            <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-slate-500">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
                                />
                                <span>
                                    I agree to the{" "}
                                    <a href="/terms" className="font-semibold text-blue-600 hover:underline">
                                        Terms
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacy" className="font-semibold text-blue-600 hover:underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </span>
                            </label>

                            {/* Feedback */}
                            {error && (
                                <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs leading-5 text-red-700">
                                    {error}
                                </p>
                            )}
                            {message && (
                                <p role="status" className="rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-700">
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Create account
                            </button>

                            <p className="text-center text-xs leading-5 text-slate-500">
                                Already have an account?{" "}
                                <a href="/login" className="font-semibold text-blue-600 hover:underline">
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}