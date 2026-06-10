import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/common/Button';
import MagneticButton from '../../components/common/MagneticButton';
import { SkeletonCard, SkeletonHero } from '../../components/common/Skeleton';
import useReady from '../../hooks/useReady';
import { useApp } from '../../../context/AppContext';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STAGES = [
  { id: 'before', title: 'Before', desc: 'How were you feeling going in?' },
  { id: 'during', title: 'During', desc: 'What shifted in the moment?' },
  { id: 'after', title: 'After', desc: 'What stayed with you?' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { results } = useApp();
  const ready = useReady(450);

  return (
    <PageTransition className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto pb-10">
        {!ready ? (
          <div className="px-4 sm:px-6 pt-6 sm:pt-8">
            <div className="max-w-2xl mx-auto space-y-5">
              <SkeletonHero className="bg-[#8C52FF]/10" />
              <SkeletonCard className="h-24" />
              <SkeletonCard className="h-24" />
              <SkeletonCard className="h-24" />
            </div>
          </div>
        ) : (
          <>
            {/* Combined navy navbar → purple hero, flush against the navbar above (no gap) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden"
            >
              <div
                className="px-6 sm:px-10 pt-10 sm:pt-14 pb-16 text-center text-white"
                style={{ background: 'linear-gradient(180deg, #1A3A6B 0%, #8C52FF 60%, #8C52FF 100%)' }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-3">~10 Minute Deep-Dive</p>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl mb-4">Discover the real you</h1>
                <p className="text-sm text-white/80 leading-relaxed max-w-md mx-auto">
                  A quick, honest look at how you think, react, and grow. A few prompts before, during, and after — that's it.
                </p>
              </div>
              <svg
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 w-full h-10 sm:h-14"
                aria-hidden="true"
              >
                <path
                  fill="#FFFFFF"
                  d="M0,32L80,37.3C160,43,320,53,480,50.7C640,48,800,32,960,26.7C1120,21,1280,27,1360,29.3L1440,32L1440,60L0,60Z"
                />
              </svg>
            </motion.div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-5">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                <GlassCard className="p-5 sm:p-6" lift={false}>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-[#8C52FF]" />
                    {STAGES.map((stage, i) => (
                      <div
                        key={stage.id}
                        className={`py-4 first:pt-0 last:pb-0 ${i < STAGES.length - 1 ? 'border-b border-black/10' : ''}`}
                      >
                        <p className="font-display font-bold text-lg mb-1 text-black">{stage.title}</p>
                        <p className="text-sm text-black/55 leading-relaxed">{stage.desc}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="pt-1 pb-2">
                <MagneticButton strength={0.25}>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/assessment')}
                    style={{ background: '#8C52FF', boxShadow: '0 12px 30px -8px rgba(140, 82, 255, 0.45)' }}
                  >
                    {results ? 'Retake Assessment' : 'Begin Assessment'}
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
