import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'
import MissionBadge from './MissionBadge'

export default function BadgeModal({ visible, crewName, onClose }) {
    const executeDownload = () => {
        const canvas = document.getElementById('mission-badge-canvas')
        if (!canvas) return
        try {
            const url = canvas.toDataURL('image/png')
            const a = document.createElement('a')
            a.href = url
            a.download = `Badge_Sophie_${crewName || 'ASTRONAUTE'}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        } catch (e) {
            console.error("Erreur téléchargement image", e)
        }
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'rgba(5,11,20,0.85)', backdropFilter: 'blur(8px)' }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative z-10 glass-modal rounded-3xl p-8 flex flex-col items-center w-full max-w-sm"
                        style={{
                            boxShadow: '0 0 60px rgba(0,240,255,0.15), inset 0 0 20px rgba(0,240,255,0.05)',
                            border: '1px solid rgba(0,240,255,0.2)'
                        }}
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/70" />
                        </button>

                        <h2 className="font-display text-white text-xl font-bold tracking-widest uppercase mb-2 text-center" style={{ textShadow: '0 0 20px rgba(0,240,255,0.4)' }}>
                            Badge Autorisé
                        </h2>
                        <p className="font-tech text-primary/70 text-xs tracking-[0.2em] uppercase mb-8 text-center max-w-[250px]">
                            Votre accréditation est prête à être archivée.
                        </p>

                        {/* Mission Badge */}
                        <div className="mb-8 w-48 h-48 pointer-events-none drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                            <MissionBadge name={crewName} className="w-full h-full" />
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={executeDownload}
                            className="group w-full py-4 bg-[#00FFFF]/10 border border-[#00FFFF] font-tech font-bold text-[#00FFFF] text-sm uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#00FFFF] hover:text-black hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]"
                            style={{ boxShadow: 'inset 0 0 15px rgba(0,240,255,0.2)' }}
                        >
                            <Download className="w-5 h-5" />
                            <span className="tracking-[0.2em] font-black">Archiver mon badge</span>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
