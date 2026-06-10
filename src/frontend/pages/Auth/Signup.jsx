import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormField from '../../components/auth/FormField';
import { inputClass, inputState, selectClass } from '../../components/auth/formStyles';
import { useApp } from '../../../context/AppContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^\d{10}$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const TODAY = new Date('2026-06-10');

const STEPS = [
  { id: 'personal', title: 'Personal Information', icon: '🧑' },
  { id: 'academic', title: 'Academic Information', icon: '🎓' },
  { id: 'account', title: 'Account Setup', icon: '🔒' },
  { id: 'verify', title: 'Verification', icon: '✅' },
];

const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'AI & Data Science',
  'Business Administration',
];

const PROGRAMMES = ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'BCA', 'MCA', 'MBA', 'Ph.D.'];

const ADMISSION_YEARS = Array.from({ length: 7 }, (_, i) => TODAY.getFullYear() - i);

const initialForm = {
  firstName: '',
  lastName: '',
  dob: '',
  gender: '',
  personalEmail: '',
  mobile: '',
  rollNumber: '',
  yearOfAdmission: '',
  department: '',
  programme: '',
  collegeEmail: '',
  password: '',
  confirmPassword: '',
  fileName: '',
  termsAccepted: false,
};

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

function Stepper({ step }) {
  return (
    <div className="mb-8 flex items-center">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`h-9 w-9 rounded-full grid place-items-center text-sm font-bold border-2 transition-colors duration-300 ${
                i < step
                  ? 'bg-[#2563EB] border-[#2563EB] text-white'
                  : i === step
                  ? 'bg-white border-[#2563EB] text-[#2563EB] shadow-[0_0_0_4px_rgba(37,99,235,0.12)]'
                  : 'bg-slate-50 border-slate-200 text-slate-300'
              }`}
            >
              {i < step ? '✓' : s.icon}
            </div>
            <span className={`hidden sm:block text-[10px] font-bold uppercase tracking-wide text-center ${i <= step ? 'text-[#1A3A6B]' : 'text-slate-300'}`}>
              {s.title}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 flex-1 mx-2 rounded transition-colors duration-300 ${i < step ? 'bg-[#2563EB]' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (field) => (e) => {
    const value = field === 'termsAccepted' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setForm((f) => ({ ...f, fileName: file ? file.name : '' }));
    setErrors((er) => ({ ...er, fileName: undefined }));
  };

  const validateStep = (current) => {
    const next = {};
    if (current === 0) {
      if (!form.firstName.trim()) next.firstName = 'First name is required.';
      if (!form.lastName.trim()) next.lastName = 'Last name is required.';
      if (!form.dob) next.dob = 'Date of birth is required.';
      else if (new Date(form.dob) > TODAY) next.dob = 'Date of birth cannot be in the future.';
      if (!form.gender) next.gender = 'Please select a gender.';
      if (!form.personalEmail.trim()) next.personalEmail = 'Personal email is required.';
      else if (!EMAIL_RE.test(form.personalEmail)) next.personalEmail = 'Enter a valid email address.';
      if (!form.mobile.trim()) next.mobile = 'Mobile number is required.';
      else if (!MOBILE_RE.test(form.mobile)) next.mobile = 'Enter a valid 10-digit mobile number.';
    }
    if (current === 1) {
      if (!form.rollNumber.trim()) next.rollNumber = 'Roll number is required.';
      if (!form.yearOfAdmission) next.yearOfAdmission = 'Please select a year.';
      if (!form.department) next.department = 'Please select a department.';
      if (!form.programme) next.programme = 'Please select a programme.';
      if (!form.collegeEmail.trim()) next.collegeEmail = 'College email is required.';
      else if (!EMAIL_RE.test(form.collegeEmail)) next.collegeEmail = 'Enter a valid email address.';
    }
    if (current === 2) {
      if (!form.password) next.password = 'Password is required.';
      else if (!PASSWORD_RE.test(form.password)) next.password = 'At least 8 characters, with letters and numbers.';
      if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password.';
      else if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';
    }
    if (current === 3) {
      if (!form.fileName) next.fileName = 'Please upload a verification document.';
      if (!form.termsAccepted) next.termsAccepted = 'You must accept the Terms & Conditions to continue.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    login();
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      eyebrow="Join PersonaVerse"
      title="Create your student account"
      subtitle="Set up your profile to start your personality intelligence assessment."
      wide
    >
      <Stepper step={step} />

      <form onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                <FormField label="First Name" error={errors.firstName}>
                  <input
                    type="text"
                    autoComplete="given-name"
                    placeholder="Ananya"
                    value={form.firstName}
                    onChange={update('firstName')}
                    className={`${inputClass} ${inputState(errors.firstName)}`}
                  />
                </FormField>
                <FormField label="Last Name" error={errors.lastName}>
                  <input
                    type="text"
                    autoComplete="family-name"
                    placeholder="Sharma"
                    value={form.lastName}
                    onChange={update('lastName')}
                    className={`${inputClass} ${inputState(errors.lastName)}`}
                  />
                </FormField>
                <FormField label="Date of Birth" error={errors.dob}>
                  <input
                    type="date"
                    max="2026-06-10"
                    value={form.dob}
                    onChange={update('dob')}
                    className={`${inputClass} ${inputState(errors.dob)}`}
                  />
                </FormField>
                <FormField label="Gender" error={errors.gender}>
                  <select value={form.gender} onChange={update('gender')} className={`${selectClass} ${inputState(errors.gender)}`}>
                    <option value="">Select gender</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Personal Email" error={errors.personalEmail}>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    value={form.personalEmail}
                    onChange={update('personalEmail')}
                    className={`${inputClass} ${inputState(errors.personalEmail)}`}
                  />
                </FormField>
                <FormField label="Mobile Number" error={errors.mobile}>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    value={form.mobile}
                    onChange={update('mobile')}
                    className={`${inputClass} ${inputState(errors.mobile)}`}
                  />
                </FormField>
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                <FormField label="Student Roll Number" error={errors.rollNumber}>
                  <input
                    type="text"
                    placeholder="21CSE1042"
                    value={form.rollNumber}
                    onChange={update('rollNumber')}
                    className={`${inputClass} ${inputState(errors.rollNumber)}`}
                  />
                </FormField>
                <FormField label="Year of Admission" error={errors.yearOfAdmission}>
                  <select value={form.yearOfAdmission} onChange={update('yearOfAdmission')} className={`${selectClass} ${inputState(errors.yearOfAdmission)}`}>
                    <option value="">Select year</option>
                    {ADMISSION_YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Department" error={errors.department}>
                  <select value={form.department} onChange={update('department')} className={`${selectClass} ${inputState(errors.department)}`}>
                    <option value="">Select department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Programme" error={errors.programme}>
                  <select value={form.programme} onChange={update('programme')} className={`${selectClass} ${inputState(errors.programme)}`}>
                    <option value="">Select programme</option>
                    {PROGRAMMES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="College Email" error={errors.collegeEmail} className="sm:col-span-2">
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@college.edu"
                    value={form.collegeEmail}
                    onChange={update('collegeEmail')}
                    className={`${inputClass} ${inputState(errors.collegeEmail)}`}
                  />
                </FormField>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                <FormField label="Password" error={errors.password} hint={!errors.password ? 'At least 8 characters, with letters and numbers.' : undefined}>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
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
                <FormField label="Confirm Password" error={errors.confirmPassword}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    className={`${inputClass} ${inputState(errors.confirmPassword)}`}
                  />
                </FormField>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <FormField
                  label="Identity / Admission Document"
                  error={errors.fileName}
                  hint={!errors.fileName ? 'Upload a college ID card or admission letter (PDF or image).' : undefined}
                >
                  <label
                    htmlFor="verification-file"
                    className={`flex items-center justify-between gap-3 rounded-xl border border-dashed px-4 py-3.5 text-sm cursor-pointer transition-colors ${
                      errors.fileName ? 'border-rose-400 text-rose-500' : 'border-slate-300 text-slate-500 hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    <span className="truncate">{form.fileName || 'Click to choose a file…'}</span>
                    <span className="shrink-0 rounded-lg bg-[#EFF6FF] text-[#2563EB] font-bold px-3 py-1.5 text-xs">Browse</span>
                  </label>
                  <input id="verification-file" type="file" accept="image/*,.pdf" onChange={handleFile} className="hidden" />
                </FormField>

                <label className={`flex items-start gap-3 text-sm font-medium cursor-pointer select-none ${errors.termsAccepted ? 'text-rose-600' : 'text-slate-600'}`}>
                  <input
                    type="checkbox"
                    checked={form.termsAccepted}
                    onChange={update('termsAccepted')}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]/30"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#terms" className="font-bold text-[#2563EB] hover:text-[#1E40AF]">Terms &amp; Conditions</a>{' '}
                    and{' '}
                    <a href="#privacy" className="font-bold text-[#2563EB] hover:text-[#1E40AF]">Privacy Policy</a>.
                  </span>
                </label>
                {errors.termsAccepted && <p className="-mt-3 text-xs font-medium text-rose-600">{errors.termsAccepted}</p>}

                <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 px-4 py-3.5 text-xs text-slate-500 leading-relaxed">
                  <span className="font-bold text-[#1A3A6B]">Almost there!</span> Review your details using the Back button if needed,
                  then create your account to start your PersonaVerse assessment.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={goBack}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              ← Back
            </motion.button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              onClick={goNext}
              className="rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
            >
              Continue →
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              className="rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 disabled:opacity-60"
            >
              {submitting ? 'Creating account…' : 'Create Account'}
            </motion.button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#2563EB] hover:text-[#1E40AF] transition-colors">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
