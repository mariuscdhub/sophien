import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Mail, Phone, ExternalLink, Cpu, User, Briefcase } from 'lucide-react'

export default function AuthorPanel({ visible, onClose }) {
    const contactLinks = [
        {
            icon: <Linkedin className="w-5 h-5" />,
            label: 'LinkedIn',
            value: 'Marius Coudurier',
            href: 'https://www.linkedin.com/in/marius-coudurier-092725316/',
            color: '#0077B5'
        },
        {
            icon: <Mail className="w-5 h-5" />,
            label: 'Email',
            value: 'marius.coudurier@etu.u-bordeaux.fr',
            href: 'mailto:marius.coudurier@etu.u-bordeaux.fr',
            color: '#00FFFF'
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: 'Téléphone',
            value: '06 49 55 98 96',
            href: 'tel:0649559896',
            color: '#00FF99'
        }
    ]

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
            {/* Backdrop with heavy blur */}
            <motion.div
                className="absolute inset-0 bg-[#050B14]/80 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: visible ? 1 : 0 }}
                onClick={onClose}
            />

            {/* Main Profile Card */}
            <motion.div
                className="relative z-10 w-full max-w-lg bg-[#0A1A2F]/90 border border-[#00FFFF]/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.1)]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9, y: visible ? 0 : 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                {/* HUD Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                {/* Header Decor */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-50" />
                
                {/* Content */}
                <div className="p-8">
                    {/* Top Row: Profile & Info */}
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                        {/* Avatar Column */}
                        <div className="relative group">
                            {/* Animated Rings */}
                            <motion.div 
                                className="absolute -inset-3 border border-[#00FFFF]/20 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute -inset-1.5 border border-[#00FFFF]/40 rounded-full border-dashed"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                            
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.3)] relative z-10 bg-[#050B14]">
                                <img 
                                    src="/marius.jpg" 
                                    alt="Marius Coudurier" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marius' }}
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00FFFF]/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#00FF99] rounded-full border-4 border-[#0A1A2F] z-20 shadow-[0_0_10px_#00FF99]" />
                        </div>

                        {/* Text Column */}
                        <div className="flex-1 text-center md:text-left pt-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FFFF]/10 border border-[#00FFFF]/20 mb-3">
                                <Cpu className="w-3 h-3 text-[#00FFFF]" />
                                <span className="font-tech text-[9px] text-[#00FFFF] tracking-[0.2em] uppercase">Ingénieur Mission</span>
                            </div>
                            <h2 className="font-display text-3xl font-bold text-white mb-1 tracking-tight">
                                Marius <span className="text-[#00FFFF]">Coudurier</span>
                            </h2>
                            <p className="font-tech text-[#00FFFF]/70 text-xs tracking-widest uppercase mb-4">
                                Élève de 1ère année en GEII
                            </p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <a 
                                    href="https://mariuscdhub.github.io/portfolio-site/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                                >
                                    <Briefcase className="w-4 h-4 text-white/50" />
                                    <span className="font-tech text-[10px] text-white tracking-wider uppercase">Portfolio</span>
                                    <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-[#00FFFF] transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-8">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.label === 'LinkedIn' ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00FFFF]/40 hover:bg-[#00FFFF]/5 transition-all group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-white/40 group-hover:text-[#00FFFF] group-hover:border-[#00FFFF]/30 transition-all">
                                    {link.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-tech text-[9px] text-white/30 tracking-widest uppercase mb-0.5">{link.label}</span>
                                    <span className="font-display text-sm text-white/80 group-hover:text-white transition-colors">{link.value}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Footer / AI Mention */}
                    <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 py-2 px-4 rounded-lg bg-black/30 border border-white/5">
                            <Cpu className="w-4 h-4 text-[#00FFFF]/50 animate-pulse" />
                            <p className="font-tech text-[10px] text-white/40 leading-relaxed text-center">
                                SYSTÈME CONÇU AVEC L'ASSISTANCE DE <br />
                                <span className="text-[#00FFFF]/60">MODÈLES D'INTELLIGENCE ARTIFICIELLE GÉNÉRATIVE</span>
                            </p>
                        </div>
                        
                        <button 
                            onClick={onClose}
                            className="w-full py-4 font-tech text-xs tracking-[0.3em] uppercase text-white/50 hover:text-[#00FFFF] transition-colors bg-white/5 hover:bg-[#00FFFF]/10 rounded-2xl border border-transparent hover:border-[#00FFFF]/20"
                        >
                            Fermer le Dossier
                        </button>
                    </div>
                </div>

                {/* Corner Decor */}
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#00FFFF]/20 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#00FFFF]/20 rounded-bl-xl pointer-events-none" />
            </motion.div>
        </motion.div>
    )
}
