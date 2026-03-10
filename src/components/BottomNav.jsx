import { motion } from 'framer-motion'

/**
 * Bottom navigation bar with two actions:
 * - Timeline (ISS history)
 * - Info / About
 */
export default function BottomNav({ onTimeline, onInfo, onOpenPanorama, onOpenMRT, ready, badgeReady }) {
    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 40 }}
            transition={{ duration: 0.6, delay: 1.2 }}
        >
            <div className="flex justify-center pb-8 px-6 pointer-events-auto">
                <motion.div
                    className="flex md:gap-6 gap-1 sm:gap-3 px-2 sm:px-6 py-3 sm:py-4 rounded-3xl relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(8, 20, 35, 0.9) 0%, rgba(5, 11, 20, 0.95) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0,240,255,0.4)',
                        boxShadow: '0 0 35px rgba(0,240,255,0.2)',
                    }}
                    animate={{
                        boxShadow: [
                            '0 0 30px rgba(0,240,255,0.2)',
                            '0 0 50px rgba(0,240,255,0.4)',
                            '0 0 30px rgba(0,240,255,0.2)'
                        ],
                        borderColor: [
                            'rgba(0,240,255,0.3)',
                            'rgba(0,240,255,0.6)',
                            'rgba(0,240,255,0.3)'
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Glowing background behind navigation */}
                    <div className="absolute inset-0 bg-primary/5 rounded-3xl pointer-events-none" style={{ mixBlendMode: 'overlay' }} />

                    {/* Timeline button */}
                    <NavButton
                        onClick={onTimeline}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="drop-shadow-lg">
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
                    <div className="w-px h-12 self-center mx-2" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.5), transparent)' }} />

                    {/* Info button */}
                    <NavButton
                        onClick={onInfo}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="drop-shadow-lg">
                                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M9 8V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <circle cx="9" cy="5.5" r="1" fill="currentColor" />
                            </svg>
                        }
                        label="Informations"
                    />

                    {/* Divider */}
                    <div className="w-px h-12 self-center mx-1 sm:mx-2" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.5), transparent)' }} />

                    {/* Panorama button */}
                    <NavButton
                        onClick={onOpenPanorama}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg" stroke="currentColor" strokeWidth="1.5">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        }
                        label="Vue 360"
                    />

                    {/* Divider */}
                    <div className="w-px h-12 self-center mx-1 sm:mx-2" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.5), transparent)' }} />

                    {/* MRT Test button (always active) */}
                    <NavButton
                        onClick={onOpenMRT}
                        className="bg-[#ffbf00]/20 border border-[#ffbf00] hover:bg-[#ffbf00]/40 drop-shadow-[0_0_15px_rgba(255,191,0,0.5)]"
                        labelClassName="text-[#ffbf00] group-hover:text-amber-300"
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg text-[#ffbf00]" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        }
                        label="Test"
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}

function NavButton({ onClick, icon, label, className = "", labelClassName = "text-white/80 group-hover:text-primary" }) {
    return (
        <motion.button
            onClick={onClick}
            className={`group flex flex-col items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 rounded-2xl transition-all relative overflow-hidden ${className ? className : 'hover:bg-primary/10'}`}
            style={{ minWidth: 70 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative z-10 transition-transform group-hover:-translate-y-1">
                {icon}
            </div>
            <span className={`font-tech text-[9px] sm:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-shadow-glow ${labelClassName}`}>
                {label}
            </span>
        </motion.button>
    )
}
