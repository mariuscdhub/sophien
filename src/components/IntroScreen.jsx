import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function IntroScreen({ onEnter }) {
    // Auto-advance on long press or after 6s as fallback
    useEffect(() => {
        const timer = setTimeout(onEnter, 7000)
        return () => clearTimeout(timer)
    }, [onEnter])

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
                style={{ background: '#050B14' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Animated grid background */}
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(0,240,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.4) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                    animate={{ opacity: [0.06, 0.14, 0.06] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Earth glow behind model */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{
                        width: '150%',
                        height: '40%',
                        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,80,200,0.25) 0%, transparent 70%)',
                    }}
                />

                {/* Outer orbit ring */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 300,
                        height: 300,
                        border: '1px solid rgba(0,240,255,0.15)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    {/* Satellite dot on ring */}
                    <div
                        className="absolute w-2 h-2 rounded-full bg-primary"
                        style={{ top: -4, left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 8px rgba(0,240,255,0.8)' }}
                    />
                </motion.div>

                {/* Inner orbit ring */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 200,
                        height: 200,
                        border: '1px solid rgba(0,240,255,0.08)',
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                >
                    <div
                        className="absolute w-1.5 h-1.5 rounded-full bg-primary opacity-50"
                        style={{ bottom: -3, left: '50%', transform: 'translateX(-50%)' }}
                    />
                </motion.div>

                {/* Central content */}
                <div className="relative z-10 flex flex-col items-center text-center px-8">
                    {/* Logo mark */}
                    <motion.div
                        className="mb-8"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{
                                background: 'rgba(0,240,255,0.06)',
                                border: '1.5px solid rgba(0,240,255,0.4)',
                                boxShadow: '0 0 40px rgba(0,240,255,0.2), inset 0 0 20px rgba(0,240,255,0.05)',
                            }}
                        >
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <circle cx="18" cy="18" r="6" stroke="#00F0FF" strokeWidth="1.5" />
                                <path d="M18 3V10M18 26V33M3 18H10M26 18H33" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="18" cy="18" r="13" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="2 5" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Title block */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p
                            className="font-tech text-primary text-[10px] tracking-[0.55em] uppercase mb-2"
                            style={{ textShadow: '0 0 12px rgba(0,240,255,0.6)' }}
                        >
                            Bienvenue dans
                        </p>
                        <h1
                            className="font-display text-white text-5xl font-bold tracking-widest uppercase mb-1"
                            style={{ textShadow: '0 0 40px rgba(0,240,255,0.4)' }}
                        >
                            Mission
                        </h1>
                        <h1
                            className="font-display font-bold tracking-widest uppercase text-5xl"
                            style={{
                                background: 'linear-gradient(135deg, #00F0FF 0%, #60EFFF 50%, #00B8CC 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.6))',
                            }}
                        >
                            Sophie
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        className="font-display text-white/40 text-sm leading-relaxed mt-4 mb-10 max-w-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        Explorez la Station Spatiale Internationale en 3D.
                        Découvrez ses modules, ses technologies et ses missions.
                    </motion.p>

                    {/* CTA button */}
                    <motion.button
                        onClick={onEnter}
                        className="relative overflow-hidden px-10 py-4 rounded-2xl font-display font-bold text-space-bg text-base tracking-widest uppercase"
                        style={{
                            background: 'linear-gradient(135deg, #00F0FF, #00B8CC)',
                            boxShadow: '0 0 30px rgba(0,240,255,0.4), 0 4px 20px rgba(0,0,0,0.3)',
                        }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(0,240,255,0.6)' }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Shine sweep */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                        />
                        <span className="relative">Explorer l'ISS →</span>
                    </motion.button>

                    {/* Skip text */}
                    <motion.p
                        className="font-tech text-white/20 text-[10px] tracking-wider mt-5 uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        Accès automatique dans 7s
                    </motion.p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
