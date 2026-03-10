import { motion, AnimatePresence } from 'framer-motion'
import { Globe2, UserCheck, Briefcase, Mic } from 'lucide-react'

const INFO_CONTENT = {
    title: 'Mission:SOPHIE',
    subtitle: 'Station Orbitale pour la Promotion des communications Hyperfréquences',
    sections: [
        {
            icon: <Globe2 className="w-5 h-5 text-[#00FFFF]" />,
            heading: 'Le Projet Régional',
            text: "Porté par l'IUT de Bordeaux (département GEII) et sélectionné par le programme international ARISS, ce projet scientifique et pédagogique exceptionnel mobilise plus de 1 500 élèves dans 50 établissements de toute la Nouvelle-Aquitaine, du primaire au lycée.",
        },
        {
            icon: <UserCheck className="w-5 h-5 text-[#00FFFF]" />,
            heading: 'Le Rôle des Étudiants GEII',
            text: "Les étudiants de l'IUT sont au cœur du projet : ils conçoivent de A à Z la station radio (VHF/UHF, antennes directionnelles, poursuite orbitale automatique), tout en animant les ateliers d'ingénierie dans les classes participantes.",
        },
        {
            icon: <Briefcase className="w-5 h-5 text-[#00FFFF]" />,
            heading: 'Le Défi Pédagogique',
            text: "Grâce aux mallettes fournies par l'IUT, les élèves expérimentent : création de télégraphes en primaire, conception d'antennes radio au collège/lycée. Les objectifs ? Promouvoir les sciences, l'inclusivité, et encourager les jeunes filles vers les carrières techniques.",
        },
        {
            icon: <Mic className="w-5 h-5 text-[#00FFFF]" />,
            heading: 'Avril 2026 : Le Contact ISS',
            text: "L'apothéose du projet aura lieu entre le 20 et le 24 avril 2026 : un contact radio en direct exclusif entre les élèves et l'astronaute française Sophie Adenot, à bord de l'ISS. Le Grand Prix de la communication spatiale clôturera le projet le 28 avril.",
        },
    ],
}

export default function InfoPanel({ visible, onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end pointer-events-none"
            style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0"
                style={{ background: 'rgba(5,11,20,0.7)', backdropFilter: 'blur(4px)' }}
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: visible ? 1 : 0 }}
            />

            {/* Panel */}
            <motion.div
                className="relative z-10 glass-modal rounded-t-[2rem] max-h-[80vh] overflow-hidden flex flex-col"
                style={{ boxShadow: '0 -10px 60px rgba(0,240,255,0.12)' }}
                initial={{ y: '100%' }}
                animate={{ y: visible ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
                {/* Top line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3">
                    <div>
                        <p className="font-tech text-primary text-[10px] tracking-[0.3em] uppercase">{INFO_CONTENT.subtitle}</p>
                        <h2 className="font-display text-white text-xl font-bold">{INFO_CONTENT.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        aria-label="Fermer"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="h-px mx-6 mb-4" style={{ background: 'linear-gradient(90deg, rgba(0,240,255,0.4), transparent)' }} />

                {/* Content */}
                <div className="overflow-y-auto px-5 pb-10 space-y-4">
                    {INFO_CONTENT.sections.map((section, i) => (
                        <motion.div
                            key={section.heading}
                            className="rounded-2xl p-4"
                            style={{
                                background: 'rgba(0,240,255,0.04)',
                                border: '1px solid rgba(0,240,255,0.1)',
                            }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
                            transition={{ delay: visible ? 0.1 + i * 0.07 : 0 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{section.icon}</span>
                                <h3 className="font-tech text-primary text-xs font-semibold tracking-wider uppercase">
                                    {section.heading}
                                </h3>
                            </div>
                            <p className="font-display text-white/55 text-sm leading-relaxed whitespace-pre-line">
                                {section.text}
                            </p>
                        </motion.div>
                    ))}

                    {/* Badge */}
                    <div className="flex justify-center pt-2">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.15)' }}
                        >
                            <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-primary"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="font-tech text-primary/70 text-xs tracking-widest uppercase">
                                ISS Currently Active
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
