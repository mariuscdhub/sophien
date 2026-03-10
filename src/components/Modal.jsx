import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Modal({ hotspot, onClose }) {
    const backdropRef = useRef()

    // Close on backdrop click
    const handleBackdrop = (e) => {
        if (e.target === backdropRef.current) onClose()
    }

    // Close on Escape key
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <AnimatePresence>
            {hotspot && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        ref={backdropRef}
                        className="fixed inset-0 z-30 pointer-events-auto"
                        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBackdrop}
                    />

                    {/* HUD Window */}
                    <motion.div
                        key={`modal-${hotspot.id}`}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col pointer-events-auto"
                        style={{
                            width: '800px',
                            maxWidth: '95vw',
                            background: 'rgba(0,0,0,0.85)',
                            border: '1px solid #00FFFF',
                            boxShadow: '0 0 30px rgba(0,255,255,0.15)'
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header bar */}
                        <div className="flex justify-between items-center border-b border-[#00FFFF]/40 px-6 py-4 bg-[#00FFFF]/5">
                            <h2 className="font-tech text-[#00FFFF] text-xl font-bold uppercase tracking-[0.2em] border-b border-[#00FFFF] pb-1 inline-block">
                                {hotspot.title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center border border-[#00FFFF]/50 text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-colors"
                                aria-label="Fermer"
                            >
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                                </svg>
                            </button>
                        </div>

                        {/* Content Body (Flex Row) */}
                        <div className="flex flex-col md:flex-row p-8 gap-10 items-start">
                            {/* Left: Technical Data Block */}
                            <div className="w-full md:w-1/3 flex flex-col gap-5 font-tech shrink-0">
                                {hotspot.subtitle && (
                                    <div className="flex flex-col">
                                        <span className="text-[#00FFFF]/50 text-[10px] uppercase tracking-widest mb-1">Système</span>
                                        <span className="text-white text-sm uppercase tracking-wider">{hotspot.subtitle}</span>
                                    </div>
                                )}

                                {hotspot.freq && (
                                    <div className="flex flex-col">
                                        <span className="text-[#00FFFF]/50 text-[10px] uppercase tracking-widest mb-1">Signal</span>
                                        <div className="flex items-center gap-2">
                                            <motion.span
                                                className="w-1.5 h-1.5 bg-[#00FFFF]"
                                                animate={{ opacity: [1, 0.3, 1] }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                            />
                                            <span className="text-[#00FFFF] text-sm uppercase font-bold tracking-widest">{hotspot.freq}</span>
                                        </div>
                                    </div>
                                )}

                                {hotspot.stats && (
                                    <div className="flex flex-col gap-4 mt-2">
                                        {hotspot.stats.map((stat, i) => (
                                            <div key={i} className="flex flex-col border-l-2 border-[#00FFFF]/30 pl-3">
                                                <span className="text-[#00FFFF]/50 text-[10px] uppercase tracking-widest pb-1">{stat.label}</span>
                                                <div className="flex items-baseline gap-1.5">
                                                    <span className="text-white text-lg font-bold">{stat.value}</span>
                                                    <span className="text-[#00FFFF] text-xs uppercase tracking-widest">{stat.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Descriptive Text */}
                            <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-[#00FFFF]/20 pt-6 md:pt-0 md:pl-10">
                                <p className="font-tech text-white/90 text-[13px] leading-loose tracking-wide text-justify">
                                    {hotspot.description.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return (
                                                <strong key={index} className="text-[#00FFFF] font-normal">
                                                    {part.slice(2, -2)}
                                                </strong>
                                            )
                                        }
                                        return part
                                    })}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
