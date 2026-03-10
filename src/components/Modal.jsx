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
                        style={{ background: 'rgba(5,11,20,0.5)', backdropFilter: 'blur(2px)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBackdrop}
                    />

                    {/* Modal sheet */}
                    <motion.div
                        key={`modal-${hotspot.id}`}
                        className="fixed bottom-0 left-0 right-0 z-40 glass-modal rounded-t-[2rem] overflow-hidden pointer-events-auto"
                        style={{ boxShadow: '0 -10px 60px rgba(0,240,255,0.12)' }}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                    >
                        {/* Top decorative gradient line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                        {/* Drag handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-white/20" />
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-safe pb-8">
                            {/* Header row */}
                            <div className="flex items-start justify-between mb-4 mt-2">
                                <div className="flex items-center gap-3">
                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                                        style={{
                                            background: 'rgba(0,240,255,0.08)',
                                            border: '1px solid rgba(0,240,255,0.2)',
                                            boxShadow: '0 0 20px rgba(0,240,255,0.15)',
                                        }}
                                    >
                                        {hotspot.icon}
                                    </div>
                                    <div>
                                        <p className="font-tech text-primary text-[10px] tracking-[0.25em] uppercase mb-0.5">
                                            {hotspot.subtitle}
                                        </p>
                                        <h2 className="font-display text-white text-xl font-bold leading-tight">
                                            {hotspot.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-90"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                    aria-label="Fermer"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(90deg, rgba(0,240,255,0.4), transparent)' }} />

                            {/* Stats chips */}
                            {hotspot.stats && (
                                <div className="grid grid-cols-2 gap-3 mb-5">
                                    {hotspot.stats.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="rounded-2xl p-3"
                                            style={{
                                                background: 'rgba(0,240,255,0.05)',
                                                border: '1px solid rgba(0,240,255,0.12)',
                                            }}
                                        >
                                            <p className="font-tech text-white/40 text-[9px] tracking-widest uppercase mb-1">
                                                {stat.label}
                                            </p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="font-display text-white text-lg font-bold">{stat.value}</span>
                                                <span className="font-tech text-primary text-xs">{stat.unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Frequency chip */}
                            {hotspot.freq && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                                    style={{
                                        background: 'rgba(0,240,255,0.08)',
                                        border: '1px solid rgba(0,240,255,0.25)',
                                    }}>
                                    <motion.span
                                        className="w-1.5 h-1.5 rounded-full bg-primary"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                    />
                                    <span className="font-tech text-primary text-sm font-semibold tracking-widest">{hotspot.freq}</span>
                                </div>
                            )}

                            {/* Description */}
                            <p className="font-display text-white/80 text-sm leading-relaxed whitespace-pre-line">
                                {hotspot.description.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return (
                                            <strong key={index} className="text-white font-bold">
                                                {part.slice(2, -2)}
                                            </strong>
                                        )
                                    }
                                    return part
                                })}
                            </p>

                            {/* Ambient glow */}
                            <div
                                className="absolute bottom-0 right-0 w-56 h-56 rounded-full pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
                                    transform: 'translate(30%, 30%)',
                                }}
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
