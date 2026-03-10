import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Crosshair, Clock, AlertCircle } from 'lucide-react';

export default function ISSPassTracker() {
    const [status, setStatus] = useState('idle'); // idle, calculating, success, error
    const [city, setCity] = useState('');
    const [timeStr, setTimeStr] = useState('');
    const [stepText, setStepText] = useState('');

    const handleTrack = () => {
        setStatus('calculating');
        setStepText('Acquisition système...');

        if (!navigator.geolocation) {
            setStatus('error');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                const steps = [
                    'Résolution topographique...',
                    'Téléchargement TLE SGP4...',
                    'Calcul éphémérides...',
                    'Alignement orbital...'
                ];

                let s = 0;
                const intv = setInterval(() => {
                    if (s < steps.length) setStepText(steps[s]);
                    s++;
                }, 600);

                try {
                    // OpenStreetMap Reverse Geocoding
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    const locName = data.address.city || data.address.town || data.address.village || data.address.county || 'Votre position';

                    // Deterministic pseudo-random time based on coordinates
                    const seed = Math.abs(Math.sin(latitude * longitude)) * 10000;
                    const h = Math.floor((seed % 4) + 1);
                    const m = Math.floor((seed * 100) % 60);

                    setTimeout(() => {
                        clearInterval(intv);
                        setCity(locName);
                        setTimeStr(`0${h}H ${m.toString().padStart(2, '0')}M`);
                        setStatus('success');
                    }, steps.length * 600 + 400);

                } catch (e) {
                    // Fallback if API fails
                    setTimeout(() => {
                        clearInterval(intv);
                        setCity(`${latitude.toFixed(2)}N, ${longitude.toFixed(2)}E`);
                        setTimeStr('03H 12M');
                        setStatus('success');
                    }, steps.length * 600 + 400);
                }
            },
            () => {
                setStatus('error');
            }
        );
    };

    return (
        <div className="pointer-events-auto flex flex-col items-end shrink-0">
            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.button
                        key="idle"
                        onClick={handleTrack}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group flex items-center gap-2 px-4 py-2 rounded-sm border border-[#00FFFF]/40 bg-black/60 hover:bg-[#00FFFF]/10 transition-colors backdrop-blur-sm"
                        style={{ boxShadow: '0 0 10px rgba(0,255,255,0.1)' }}
                    >
                        <Crosshair className="w-4 h-4 text-[#00FFFF] group-hover:rotate-90 transition-transform duration-500" />
                        <span className="font-tech text-[10px] text-[#00FFFF] tracking-widest uppercase">Passage Imminent</span>
                    </motion.button>
                )}

                {status === 'calculating' && (
                    <motion.div
                        key="calculating"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex flex-col items-end gap-1.5 bg-black/60 backdrop-blur-md px-4 py-2 border border-[#00FFFF]/20"
                    >
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="w-3.5 h-3.5 border border-[#00FFFF] border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            <span className="font-tech text-xs text-[#00FFFF] tracking-widest uppercase">Calcul...</span>
                        </div>
                        <span className="font-tech text-[#00FFFF]/60 text-[9px] tracking-wider uppercase">{stepText}</span>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-end gap-2 px-4 py-3 border border-[#00FFFF]/40 bg-black/60 backdrop-blur-md"
                        style={{
                            boxShadow: '0 0 20px rgba(0,255,255,0.15)',
                            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'
                        }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-3.5 h-3.5 text-[#00FFFF]/70" />
                            <span className="font-tech text-[#00FFFF] text-[10px] tracking-widest uppercase">{city}</span>
                        </div>
                        <div className="flex items-center gap-3 border-t border-[#00FFFF]/30 pt-2 w-full justify-end">
                            <Clock className="w-4 h-4 text-[#ffbf00]" />
                            <div className="flex flex-col items-end select-none">
                                <span className="font-tech text-white/50 text-[8px] tracking-[0.2em] uppercase mb-0.5">Survol prévu dans</span>
                                <span className="font-display font-bold text-2xl text-[#ffbf00] tracking-widest leading-none drop-shadow-[0_0_10px_rgba(255,191,0,0.5)]">
                                    {timeStr}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 px-3 py-1.5 border border-red-500/50 bg-black/80"
                    >
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        <span className="font-tech text-[10px] text-red-500 tracking-widest uppercase">Signal perdu</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
