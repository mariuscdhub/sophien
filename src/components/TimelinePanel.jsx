import { motion } from 'framer-motion'
import { Rocket, User, FlaskConical, Wrench, Cog, Flame } from 'lucide-react'

const timeline = [
    {
        year: '1998',
        label: 'Première Brique',
        desc: "Lancement du module russe Zarya, suivi du module américain Unity. C'est la naissance physique de la station spatiale.",
        icon: <Rocket className="w-4 h-4 text-[#00FFFF]" />,
    },
    {
        year: '2000',
        label: "L'Occupation Humaine",
        desc: "L'Expédition 1 entre dans la station. Depuis ce jour, l'ISS n'a littéralement jamais été vide.",
        icon: <User className="w-4 h-4 text-[#00FFFF]" />,
    },
    {
        year: '2001-21',
        label: 'Visages Français 🇫🇷',
        desc: "Claudie Haigneré (1ère Européenne, 2001), Philippe Perrin (2002), Léopold Eyharts (2008), et Thomas Pesquet (Commandant, 2016/2021) marquent l'histoire de la station.",
        icon: <FlaskConical className="w-4 h-4 text-[#00FFFF]" />,
    },
    {
        year: '2011',
        label: 'Configuration Finale',
        desc: "Fin de la construction principale avec l'ajout essentiel des laboratoires européen (Columbus) et japonais (Kibo).",
        icon: <Wrench className="w-4 h-4 text-[#00FFFF]" />,
    },
    {
        year: '2021',
        label: 'Retrofitting & IA',
        desc: "Remplacement par des panneaux solaires iROSA, routeurs ARISS haut-débit, ajout du module Nauka, et expérimentations d'Intelligence Artificielle.",
        icon: <Cog className="w-4 h-4 text-[#00FFFF]" />,
    },
    {
        year: '2026',
        label: 'Sophie Adenot 👩‍🚀',
        desc: "Sophie Adenot rejoint l'ISS, devenant la deuxième femme française à aller dans l'espace, 25 ans après Claudie Haigneré.",
        icon: <User className="w-4 h-4 text-[#00FFFF]" />,
    },
    {
        year: '2030',
        label: 'Le Grand Final',
        desc: "Fatigue structurelle obligera sa fin. Elle sera désorbitée pour s'écraser au Point Nemo, le lieu de l'océan Pacifique le plus éloigné de toute terre.",
        icon: <Flame className="w-4 h-4 text-[#ffbf00]" />,
    },
]

export default function TimelinePanel({ visible, onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end pointer-events-none"
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
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
                className="relative z-10 glass-modal rounded-t-[2rem] max-h-[85vh] overflow-hidden flex flex-col"
                style={{ boxShadow: '0 -10px 60px rgba(0,240,255,0.15)' }}
                initial={{ y: '100%' }}
                animate={{ y: visible ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
                {/* Top gradient line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3">
                    <div>
                        <p className="font-tech text-primary text-[10px] tracking-[0.3em] uppercase">Missions & Histoire</p>
                        <h2 className="font-display text-white text-xl font-bold">25 ans en orbite (28 000 km/h)</h2>
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

                {/* Subtitle */}
                <p className="font-display text-white/60 text-xs text-center px-6 mb-5">
                    L'aventure de l'ISS est celle d'un puzzle technologique sans précédent, assemblé à 400 km d'altitude au-dessus de nos têtes.
                </p>

                {/* Timeline scroll */}
                <div className="overflow-y-auto px-5 pb-8" style={{ scrollbarWidth: 'none' }}>
                    <div className="relative">
                        {/* Vertical line */}
                        <div
                            className="absolute left-[22px] top-0 bottom-0 w-[1px]"
                            style={{ background: 'linear-gradient(to bottom, rgba(0,240,255,0.6), rgba(0,240,255,0.1))' }}
                        />

                        <div className="space-y-6">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    className="flex gap-4 pl-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
                                    transition={{ delay: visible ? 0.15 + i * 0.08 : 0, duration: 0.4 }}
                                >
                                    {/* Node */}
                                    <div className="shrink-0 w-[26px] flex flex-col items-center">
                                        <div
                                            className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs z-10"
                                            style={{
                                                background: 'rgba(0,240,255,0.1)',
                                                border: '1.5px solid rgba(0,240,255,0.6)',
                                                boxShadow: '0 0 12px rgba(0,240,255,0.3)',
                                            }}
                                        >
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* Content card */}
                                    <div
                                        className="flex-1 rounded-2xl p-4 mb-1"
                                        style={{
                                            background: 'rgba(0,240,255,0.04)',
                                            border: '1px solid rgba(0,240,255,0.1)',
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-tech text-primary text-sm font-bold tracking-widest">{item.year}</span>
                                            <span
                                                className="font-tech text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                                                style={{ background: 'rgba(0,240,255,0.1)', color: 'rgba(0,240,255,0.7)' }}
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                        <p className="font-display text-white/60 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Key stats row at bottom */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        {[
                            { val: '400', unit: 'km', label: "d'altitude" },
                            { val: '28000', unit: 'km/h', label: 'vitesse' },
                            { val: '25', unit: 'ans', label: 'en orbite' },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl p-3 text-center"
                                style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.1)' }}
                            >
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="font-display text-white text-lg font-bold">{s.val}</span>
                                    <span className="font-tech text-primary text-xs">{s.unit}</span>
                                </div>
                                <p className="font-tech text-white/30 text-[9px] uppercase tracking-wide mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
