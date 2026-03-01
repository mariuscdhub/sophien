import { motion } from 'framer-motion'

/**
 * Bottom navigation bar with two actions:
 * - Timeline (ISS history)
 * - Info / About
 */
export default function BottomNav({ onTimeline, onInfo, ready }) {
    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 40 }}
            transition={{ duration: 0.6, delay: 1.2 }}
        >
            <div className="flex justify-center pb-6 px-6 pointer-events-auto">
                <div
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                    style={{
                        background: 'rgba(5,11,20,0.88)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(0,240,255,0.12)',
                        boxShadow: '0 -4px 30px rgba(0,240,255,0.08)',
                    }}
                >
                    {/* Timeline button */}
                    <NavButton
                        onClick={onTimeline}
                        icon={
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="3" cy="4.5" r="1.5" fill="currentColor" />
                                <circle cx="3" cy="9" r="1.5" fill="currentColor" />
                                <circle cx="3" cy="13.5" r="1.5" fill="currentColor" />
                                <path d="M6 4.5H15M6 9H13M6 13.5H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        }
                        label="Historique"
                    />

                    {/* Divider */}
                    <div className="w-px h-8" style={{ background: 'rgba(0,240,255,0.12)' }} />

                    {/* Info button */}
                    <NavButton
                        onClick={onInfo}
                        icon={
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M9 8V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <circle cx="9" cy="5.5" r="1" fill="currentColor" />
                            </svg>
                        }
                        label="À propos"
                    />
                </div>
            </div>
        </motion.div>
    )
}

function NavButton({ onClick, icon, label }) {
    return (
        <motion.button
            onClick={onClick}
            className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-white/40 transition-colors hover:text-primary"
            style={{ minWidth: 64 }}
            whileTap={{ scale: 0.92 }}
        >
            {icon}
            <span className="font-tech text-[9px] tracking-wider uppercase">{label}</span>
        </motion.button>
    )
}
