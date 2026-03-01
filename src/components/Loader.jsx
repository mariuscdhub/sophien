import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ visible }) {
    const { progress } = useProgress()

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ background: '#050B14' }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
                >
                    {/* Decorative grid lines */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Outer glow ring */}
                    <motion.div
                        className="relative mb-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        {/* Pulsing outer ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary opacity-30"
                            style={{ width: 120, height: 120, top: -10, left: -10 }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        {/* Logo mark */}
                        <div
                            className="w-24 h-24 rounded-full border border-primary flex items-center justify-center"
                            style={{ boxShadow: '0 0 40px rgba(0,240,255,0.3), inset 0 0 20px rgba(0,240,255,0.05)' }}
                        >
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                                <circle cx="22" cy="22" r="8" stroke="#00F0FF" strokeWidth="1.5" />
                                <path d="M22 4V14M22 30V40M4 22H14M30 22H40" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="22" cy="22" r="18" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="3 6" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <p className="font-tech text-primary text-xs tracking-[0.4em] uppercase mb-2 opacity-70">
                            Mission
                        </p>
                        <h1
                            className="font-display text-white text-4xl font-bold tracking-widest uppercase"
                            style={{ textShadow: '0 0 30px rgba(0,240,255,0.5)' }}
                        >
                            Sophie
                        </h1>
                        <p className="font-tech text-slate-400 text-xs tracking-[0.25em] mt-2 uppercase">
                            ISS · Interactive Experience
                        </p>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        className="w-56"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-tech text-primary text-xs tracking-wider">Chargement modèle</span>
                            <span className="font-tech text-primary text-xs">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, #00F0FF, #0080ff)',
                                    boxShadow: '0 0 12px rgba(0,240,255,0.8)',
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: 'easeOut' }}
                            />
                        </div>
                        {/* Shimmer shimmer bar below */}
                        <div className="w-full h-[1px] mt-1 shimmer-bar rounded-full opacity-40" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
