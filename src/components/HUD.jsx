import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import ISSPassTracker from './ISSPassTracker'

export default function HUD({ ready, badgeReady, onOpenBadge }) {
    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-safe pt-6 pb-3">
                {/* Mission Sophie branding and Badge */}
                <div className="flex flex-col gap-4 pointer-events-auto items-start">
                    <div className="flex flex-col">
                        <span
                            className="font-tech text-primary text-[10px] tracking-[0.35em] uppercase"
                            style={{ textShadow: '0 0 10px rgba(0,240,255,0.6)' }}
                        >
                            Mission
                        </span>
                        <span className="font-display text-white text-xl font-bold tracking-wider uppercase leading-tight">
                            Sophie
                        </span>
                    </div>

                    {/* Badge Ready Notification/Button */}
                    <AnimatePresence>
                        {badgeReady && (
                            <motion.button
                                onClick={onOpenBadge}
                                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                className="group relative overflow-hidden flex items-center gap-2 px-3 py-2 bg-[#00FFFF]/10 rounded-xl"
                                style={{
                                    border: '1px solid rgba(0,240,255,0.4)',
                                    boxShadow: '0 0 20px rgba(0,240,255,0.2), inset 0 0 10px rgba(0,240,255,0.1)',
                                }}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,240,255,0.2)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <ShieldAlert className="w-5 h-5 text-[#00FFFF]" />
                                </motion.div>
                                <span className="font-tech font-bold text-[#00FFFF] text-[10px] tracking-widest uppercase truncate max-w-[120px]">
                                    Badge Prêt
                                </span>

                                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#00FFFF] animate-ping opacity-50 absolute -top-1 -right-1" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Live badge & Tracker */}
                <div className="flex flex-col items-end gap-3 pointer-events-none">
                    <div className="glass flex items-center gap-2 px-3 py-1.5 rounded-full">
                        <motion.span
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="font-tech text-primary text-[10px] tracking-[0.2em] font-semibold uppercase">
                            ISS Live
                        </span>
                    </div>
                    <ISSPassTracker />
                </div>
            </div>

        </motion.div>
    )
}
