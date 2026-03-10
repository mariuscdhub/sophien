import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Rocket } from 'lucide-react'

export default function IntroScreen({ onEnter }) {
    const [name, setName] = useState('')

    const handleEnter = () => {
        onEnter(name.trim() || 'ASTRONAUTE')
    }

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
                    className="absolute inset-0 opacity-10 pointer-events-none"
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
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: '150%',
                        height: '40%',
                        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,80,200,0.25) 0%, transparent 70%)',
                    }}
                />

                {/* Outer orbit ring */}
                <motion.div
                    className="absolute rounded-full pointer-events-none"
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
                    className="absolute rounded-full pointer-events-none"
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
                <div className="relative z-10 flex flex-col items-center text-center px-8 w-full max-w-lg pointer-events-auto">
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center w-full"
                    >
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
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            <p className="font-tech text-primary text-[10px] tracking-[0.55em] uppercase mb-2" style={{ textShadow: '0 0 12px rgba(0,240,255,0.6)' }}>
                                Bienvenue dans
                            </p>
                            <h1 className="font-display text-white text-5xl font-bold tracking-widest uppercase mb-1" style={{ textShadow: '0 0 40px rgba(0,240,255,0.4)' }}>
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
                            transition={{ delay: 0.4 }}
                        >
                            Explorez la Station Spatiale Internationale en 3D.
                            Découvrez ses modules, ses technologies et ses missions.
                        </motion.p>

                        {/* Input Name */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-full mb-6"
                        >
                            <p className="font-tech text-primary text-[10px] tracking-[0.3em] uppercase mb-2" style={{ textShadow: '0 0 12px rgba(0,240,255,0.6)' }}>
                                Entrez votre identifiant
                            </p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 15))}
                                placeholder="VOTRE NOM"
                                className="w-full bg-black/40 border border-[#00FFFF]/30 rounded-none px-4 py-3 text-center text-white font-tech tracking-widest outline-none focus:border-[#00FFFF] focus:bg-[#00FFFF]/10 transition-all uppercase"
                                style={{ boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleEnter();
                                }}
                            />
                        </motion.div>

                        <div className="flex flex-col gap-4 w-full">
                            {/* Proceed to ISS */}
                            <motion.button
                                onClick={handleEnter}
                                className="group relative overflow-hidden px-8 py-3.5 bg-black font-tech font-bold text-[#ffbf00] text-sm uppercase flex items-center justify-center gap-3 transition-all duration-300 w-full"
                                style={{
                                    border: '1px solid #ffbf00',
                                    boxShadow: '0 0 15px rgba(255, 191, 0, 0.4), inset 0 0 10px rgba(255, 191, 0, 0.2)',
                                    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                                }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ boxShadow: '0 0 25px rgba(255, 191, 0, 0.8), inset 0 0 15px rgba(255, 191, 0, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Rocket className="w-5 h-5 text-[#ffbf00] shrink-0" />
                                <span className="tracking-[0.2em] group-hover:tracking-[0.4em] transition-all duration-300">
                                    Commencer l'exploration
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
