import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HeartCrack, X, Medal, ShieldAlert, Rocket } from 'lucide-react';

const QUESTIONS = [
    { text: "L'ISS est ravitaillée en électricité par des panneaux solaires géants.", answer: true, fact: "Les grands panneaux solaires fournissent 100% de l'énergie électrique de la station." },
    { text: "Il y a une machine qui génère de la gravité artificielle à bord.", answer: false, fact: "Les astronautes flottent car ils sont en perpétuelle chute libre (microgravité) autour de la Terre." },
    { text: "La station fait le tour complet de la Terre en seulement 90 minutes.", answer: true, fact: "Elle voyage à la vitesse fulgurante d'environ 28 000 km/h." },
    { text: "Les astronautes ne mangent que de la nourriture en pilules.", answer: false, fact: "Ils mangent de vrais repas, souvent lyophilisés ou thermostabilisés, avec des menus variés." },
    { text: "SOPHIE est un projet permettant aux étudiants de contacter une astronaute par radio.", answer: true, fact: "Oui ! Le projet de l'IUT vise un contact direct avec l'astronaute Sophie Adenot en 2026." },
    { text: "On peut voir l'ISS à l'œil nu depuis la surface de la Terre.", answer: true, fact: "Elle apparaît comme une étoile très brillante qui se déplace rapidement dans le ciel nocturne." },
    { text: "Le son des outils résonne fort à l'extérieur de la station lors des sorties spatiales.", answer: false, fact: "Le vide spatial empeche le son de se propager. Le silence y est absolu." },
    { text: "L'orbite artificielle de l'ISS se situe à plus de 10 000 km d'altitude.", answer: false, fact: "Faux, elle orbite en orbite basse, à seulement ~400 km d'altitude moyenne." },
    { text: "La coupole (Cupola) sert principalement à observer la Terre.", answer: true, fact: "Ses sept fenêtres offrent une vue à 360° imprenable sur notre planète bleue." },
    { text: "L'oxygène de l'air est produit en 'cassant' l'eau récupérée à bord.", answer: true, fact: "C'est l'électrolyse de l'eau qui sépare l'hydrogène et l'oxygène pour que l'équipage puisse respirer." },
    { text: "Le Soleil se lève une seule fois par tranche de 24 heures pour les astronautes.", answer: false, fact: "À cette vitesse, l'ISS fait le tour de la Terre en 90 minutes. Ils voient 16 levers et couchers de Soleil par jour !" },
    { text: "Si un astronaute pleure, ses larmes ne tombent pas.", answer: true, fact: "Sans gravité pour les tirer vers le bas, les larmes forment plutôt des bulles d'eau qui restent collées aux yeux." },
    { text: "L'ISS est le plus grand objet artificiel jamais envoyé dans l'espace.", answer: true, fact: "Elle a approximativement la taille d'un grand terrain de football, incluant les panneaux solaires." },
    { text: "La température à l'extérieur de l'ISS est constante et régulée.", answer: false, fact: "Faux ! Elle varie de -150°C dans l'ombre de la Terre jusqu'à +120°C en plein soleil." },
    { text: "Toutes les horloges de l'ISS sont réglées sur l'heure du Texas.", answer: false, fact: "L'ISS utilise le temps universel coordonné (UTC) pour se synchroniser avec toutes les agences internationales (Houston, Moscou, Europe, etc.)." }
];

export default function MissionReadinessTest({ onClose, onComplete }) {
    const [status, setStatus] = useState('intro'); // 'intro', 'playing', 'feedback', 'gameover', 'victory'
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);

    const question = QUESTIONS[currentQIndex];

    const handleAnswer = (userAnswer) => {
        const correct = userAnswer === question.answer;
        setLastAnswerCorrect(correct);

        if (correct) {
            setScore(s => s + 1);
        } else {
            setLives(l => l - 1);
        }

        setStatus('feedback');
    };

    const nextStep = () => {
        if (lives <= 0 && status === 'feedback') {
            setStatus('gameover');
            return;
        }

        if (currentQIndex >= QUESTIONS.length - 1) {
            setStatus('victory');
        } else {
            setCurrentQIndex(c => c + 1);
            setStatus('playing');
        }
    };

    const handleFinish = () => {
        let grade = "SPÉCIALISTE"; // < 12
        if (score === 15) grade = "COMMANDANT";
        else if (score >= 12) grade = "PILOTE";

        onComplete(grade, score);
    };

    const restart = () => {
        setCurrentQIndex(0);
        setLives(3);
        setScore(0);
        setStatus('intro');
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Nebula */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 50%, #080f1e 0%, #000000 100%)',
                    }}
                />

                {/* Stars/Dust effect */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '40px 40px'], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Main Card */}
                <div className="relative z-10 w-full max-w-lg">

                    {/* Top lives & Progress */}
                    {status === 'playing' || status === 'feedback' ? (
                        <div className="mb-6 flex flex-col gap-4">
                            <div className="flex justify-between items-center px-2">
                                <span className="font-tech text-white/50 text-[10px] tracking-widest uppercase">
                                    Question {currentQIndex + 1} / {QUESTIONS.length}
                                </span>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map(heartIndex => (
                                        <motion.div key={heartIndex} animate={lives < heartIndex ? { opacity: 0.2, scale: 0.8 } : { opacity: 1, scale: 1 }}>
                                            {lives >= heartIndex ?
                                                <Heart className="w-5 h-5 text-red-500 fill-red-500" /> :
                                                <HeartCrack className="w-5 h-5 text-red-500" />
                                            }
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#00FFFF] to-[#0088FF]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    ) : null}

                    {/* Glass Container */}
                    <AnimatePresence mode="wait">
                        {status === 'intro' && (
                            <motion.div
                                key="intro"
                                className="glass-modal p-8 md:p-10 rounded-3xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,100,255,0.1)] border border-white/10"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-[#00FFFF]/10 border border-[#00FFFF]/30 flex items-center justify-center mb-6">
                                    <ShieldAlert className="w-8 h-8 text-[#00FFFF]" />
                                </div>
                                <h1 className="font-display text-white text-2xl md:text-3xl font-bold uppercase tracking-widest mb-3">
                                    Test de Qualification
                                </h1>
                                <p className="font-display text-white/60 text-sm leading-relaxed mb-8">
                                    Seuls les meilleurs éléments peuvent prétendre au grade de Commandant. Prouvez vos connaissances sur l'ISS et le Projet SOPHIE en 15 questions. 3 erreurs et la mission s'arrête.
                                </p>
                                <button
                                    onClick={() => setStatus('playing')}
                                    className="w-full relative overflow-hidden group py-4 rounded-xl bg-white text-black font-tech font-bold uppercase tracking-widest border border-white hover:bg-transparent hover:text-white transition-all duration-300"
                                >
                                    Démarrer l'entraînement
                                </button>
                            </motion.div>
                        )}

                        {status === 'playing' && (
                            <motion.div
                                key="playing"
                                className="glass-modal p-6 md:p-10 rounded-3xl flex flex-col items-center text-center shadow-[0_0_40px_rgba(255,255,255,0.02)] border border-white/10 min-h-[300px] justify-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <p className="font-display text-white text-xl md:text-2xl font-medium leading-relaxed">
                                    "{question.text}"
                                </p>
                            </motion.div>
                        )}

                        {status === 'feedback' && (
                            <motion.div
                                key="feedback"
                                className={`glass-modal p-6 md:p-10 rounded-3xl flex flex-col items-center text-center border min-h-[300px] justify-center ${lastAnswerCorrect ? 'border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.15)] bg-emerald-500/5' : 'border-red-500/50 shadow-[0_0_60px_rgba(239,68,68,0.15)] bg-red-500/5'}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <h2 className={`font-display text-3xl font-bold uppercase tracking-widest mb-4 ${lastAnswerCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {lastAnswerCorrect ? "Exact." : "Erreur."}
                                </h2>
                                <p className="font-display text-white/80 text-base leading-relaxed mb-8">
                                    {question.fact}
                                </p>
                                <button
                                    onClick={nextStep}
                                    className="w-full py-4 rounded-xl bg-white/10 text-white font-tech font-bold uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    Continuer
                                </button>
                            </motion.div>
                        )}

                        {status === 'gameover' && (
                            <motion.div
                                key="gameover"
                                className="glass-modal p-8 md:p-10 rounded-3xl flex flex-col items-center text-center border border-red-500/40 bg-red-500/5 shadow-[0_0_80px_rgba(239,68,68,0.1)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                                    <HeartCrack className="w-8 h-8 text-red-500" />
                                </div>
                                <h1 className="font-display text-white text-2xl md:text-3xl font-bold uppercase tracking-widest mb-3">
                                    Échec de la simulation
                                </h1>
                                <p className="font-display text-white/60 text-sm leading-relaxed mb-8">
                                    Vous avez commis trop d'erreurs critiques. Un équipage spatial doit être préparé à 100%. Révisez vos bases et retentez votre chance.
                                </p>
                                <button
                                    onClick={restart}
                                    className="w-full py-4 rounded-xl bg-red-500/20 text-red-500 font-tech font-bold uppercase tracking-widest border border-red-500/50 hover:bg-red-500/30 transition-all"
                                >
                                    Refaire le test
                                </button>
                            </motion.div>
                        )}

                        {status === 'victory' && (
                            <motion.div
                                key="victory"
                                className="glass-modal p-8 md:p-10 rounded-3xl flex flex-col items-center text-center border border-[#00FFFF]/40 bg-[#00FFFF]/5 shadow-[0_0_80px_rgba(0,240,255,0.15)]"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="w-20 h-20 rounded-full bg-[#00FFFF]/10 border-2 border-[#00FFFF]/50 flex items-center justify-center mb-6 relative">
                                    <Medal className="w-10 h-10 text-[#00FFFF]" />
                                    <motion.div className="absolute inset-0 rounded-full border border-[#00FFFF]" animate={{ scale: [1, 1.5], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                                </div>

                                <p className="font-tech text-[#00FFFF]/70 text-[10px] tracking-[0.3em] uppercase mb-2">Résultat Officiel</p>
                                <h1 className="font-display text-white text-3xl font-bold uppercase tracking-widest mb-4 text-[#00FFFF]" style={{ textShadow: '0 0 20px rgba(0,240,255,0.5)' }}>
                                    {score === 15 ? "Commandant" : (score >= 12 ? "Pilote" : "Spécialiste")}
                                </h1>
                                <p className="font-display text-white/80 text-sm leading-relaxed mb-8">
                                    Félicitations, vous avez obtenu la note de {score}/15 au test de préparation. Votre accréditation avec votre nouveau grade a été débloquée.
                                </p>
                                <button
                                    onClick={handleFinish}
                                    className="group w-full py-4 rounded-xl bg-[#00FFFF] text-black font-tech font-bold uppercase tracking-widest border border-[#00FFFF] shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all flex justify-center items-center gap-2"
                                >
                                    <ShieldAlert className="w-5 h-5 text-black" />
                                    Générer mon badge
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Tap Zones (Mythe vs Réalité) */}
                    {status === 'playing' && (
                        <div className="flex gap-4 mt-6 w-full h-[120px] md:h-[150px]">
                            {/* MYTHE */}
                            <motion.button
                                onClick={() => handleAnswer(false)}
                                className="flex-1 rounded-2xl flex flex-col items-center justify-center border border-red-500/20 bg-red-950/20 relative overflow-hidden group"
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors" />
                                {/* Red neon glow */}
                                <div className="absolute bottom-0 w-3/4 h-2 bg-red-500 blur-xl opacity-50 block" />

                                <span className="font-display text-red-500 text-xl font-bold tracking-widest uppercase z-10" style={{ textShadow: '0 0 15px rgba(2ef44bb, 0.4)' }}>
                                    Mythe
                                </span>
                            </motion.button>

                            {/* RÉALITÉ */}
                            <motion.button
                                onClick={() => handleAnswer(true)}
                                className="flex-1 rounded-2xl flex flex-col items-center justify-center border border-emerald-500/20 bg-emerald-950/20 relative overflow-hidden group"
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors" />
                                {/* Emerald neon glow */}
                                <div className="absolute bottom-0 w-3/4 h-2 bg-emerald-500 blur-xl opacity-50 block" />

                                <span className="font-display text-emerald-500 text-xl font-bold tracking-widest uppercase z-10" style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }}>
                                    Réalité
                                </span>
                            </motion.button>
                        </div>
                    )}

                </div>
            </motion.div>
        </AnimatePresence>
    )
}
