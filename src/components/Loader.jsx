import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Loader({ visible }) {
    const { progress } = useProgress()
    const [textIndex, setTextIndex] = useState(0)

    const loadingTexts = [
        'Initialisation des systèmes...',
        'Liaison satellite établie...',
        'Synchronisation des vecteurs...'
    ]

    useEffect(() => {
        if (!visible) return;
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % loadingTexts.length);
        }, 1500)
        return () => clearInterval(interval)
    }, [visible])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
                >
                    {/* Decorative grid lines */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(#00FF00 1px, transparent 1px), linear-gradient(90deg, #00FF00 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Wireframe ISS and Laser */}
                    <motion.div className="relative mb-12 w-64 h-32 flex items-center justify-center">
                        {/* Simple ISS Wireframe SVG */}
                        <svg className="w-full h-full text-[#00FF00]/40" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <rect x="30" y="20" width="40" height="10" />
                            <rect x="45" y="10" width="10" height="30" />
                            <rect x="10" y="15" width="15" height="20" strokeDasharray="1 1" />
                            <rect x="75" y="15" width="15" height="20" strokeDasharray="1 1" />
                            <circle cx="50" cy="25" r="3" fill="currentColor" />
                            <line x1="25" y1="25" x2="30" y2="25" />
                            <line x1="70" y1="25" x2="75" y2="25" />
                        </svg>

                        {/* Laser Scan Line */}
                        <motion.div
                            className="absolute left-0 w-full h-[1px] bg-[#00FF00] shadow-[0_0_10px_#00FF00]"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>

                    {/* Progress terminal text */}
                    <div className="w-80 text-left font-tech font-mono text-[#00FF00] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <div className="flex justify-between mb-2">
                            <span className="opacity-70">SYS.LOAD_PROGRESS</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-1 bg-[#00FF00]/10 mb-6 border border-[#00FF00]/30">
                            <motion.div
                                className="h-full bg-[#00FF00] relative"
                                style={{ boxShadow: '0 0 10px #00FF00' }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: 'easeOut' }}
                            >
                                <div className="absolute right-0 top-0 w-2 h-full bg-white opacity-50" />
                            </motion.div>
                        </div>

                        {/* Matrix scrolling text */}
                        <div className="h-6 overflow-hidden relative border-l-2 border-[#00FF00] pl-3">
                            <motion.div
                                key={textIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-[#00FF00] tracking-wider uppercase text-[10px]"
                            >
                                {'>'} {loadingTexts[textIndex]}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
