import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormField from '../../components/auth/FormField';
import { inputClass, inputState } from '../../components/auth/formStyles';
import { useApp } from '../../../context/AppContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    const value = field === 'remember' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'College email is required.';
    else if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 650));
    setSubmitting(false);
    login();
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to PersonaVerse"
      subtitle="Access your personality intelligence reports and assessments."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField label="College Email" error={errors.email}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@college.edu"
            value={form.email}
            onChange={update('email')}
            className={`${inputClass} ${inputState(errors.email)}`}
          />
        </FormField>

        <FormField label="Password" error={errors.password}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={update('password')}
              className={`${inputClass} ${inputState(errors.password)} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </FormField>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 font-medium text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={update('remember')}
              className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]/30"
            />
            Remember me
          </label>
          <a href="#forgot-password" className="font-semibold text-[#2563EB] hover:text-[#1E40AF] transition-colors">
            Forgot password?
          </a>
        </div>

        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -1 }}
          className="w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-opacity disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Log In'}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-bold text-[#2563EB] hover:text-[#1E40AF] transition-colors">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
