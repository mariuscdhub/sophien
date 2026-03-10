import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import MissionBadge from './MissionBadge'

export default function IntroScreen({ onEnter }) {
    const [name, setName] = useState('')

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
                <div className="relative z-10 flex flex-col items-center text-center px-8 w-full">
                    {/* Mission Badge */}
                    <motion.div
                        className="mb-6"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <MissionBadge name={name} size={220} />
                    </motion.div>

                    {/* Name Input */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-2 w-full max-w-xs"
                    >
                        <p className="font-tech text-primary text-[10px] tracking-[0.3em] uppercase mb-2" style={{ textShadow: '0 0 12px rgba(0,240,255,0.6)' }}>
                            Identifiant Équipage
                        </p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 15))}
                            placeholder="VOTRE NOM"
                            className="w-full bg-black/40 border border-[#00FFFF]/30 rounded-none px-4 py-3 text-center text-white font-tech tracking-widest outline-none focus:border-[#00FFFF] focus:bg-[#00FFFF]/10 transition-all uppercase"
                            style={{ boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}
                        />
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
                        className="group relative overflow-hidden px-8 py-3 bg-black font-tech font-bold text-[#ffbf00] text-sm uppercase flex items-center gap-3 transition-all duration-300"
                        style={{
                            border: '1px solid #ffbf00',
                            boxShadow: '0 0 15px rgba(255, 191, 0, 0.4), inset 0 0 10px rgba(255, 191, 0, 0.2)',
                            clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                        }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        whileHover={{ boxShadow: '0 0 25px rgba(255, 191, 0, 0.8), inset 0 0 15px rgba(255, 191, 0, 0.4)' }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Radar Icon */}
                        <motion.div
                            className="w-5 h-5 border border-[#ffbf00] rounded-full relative flex items-center justify-center shrink-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
                        >
                            <div className="absolute w-1/2 h-px bg-[#ffbf00] right-0 top-1/2 origin-left transform -translate-y-1/2" />
                            <div className="w-1 h-1 bg-[#ffbf00] rounded-full" />
                        </motion.div>
                        <span className="relative tracking-[0.2em] group-hover:tracking-[0.4em] transition-all duration-300">
                            Explorer la station
                        </span>
                    </motion.button>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}
