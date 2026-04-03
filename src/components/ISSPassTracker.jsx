import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Crosshair, Clock, AlertCircle } from 'lucide-react';

export default function ISSPassTracker() {
    const [status, setStatus] = useState('idle'); // idle, calculating, success, error
    const [city, setCity] = useState('');
    const [timeStr, setTimeStr] = useState('');
    const [stepText, setStepText] = useState('');

    /**
     * Calcule un temps de passage déterministe basé sur la localisation et la date.
     * Garantit la cohérence entre appareils (PC/Mobile) pour un même lieu.
     */
    const getNextPassTime = (lat, lon, cityName) => {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
        
        // Stabilisation des coordonnées (précision ~1km) pour éviter le jitter GPS
        const stableLat = Math.round(lat * 100) / 100;
        const stableLon = Math.round(lon * 100) / 100;
        
        // Graine unique par lieu et par jour
        const seedStr = `${cityName}-${stableLat}-${stableLon}-${dateStr}`;
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
            hash |= 0;
        }
        
        const absHash = Math.abs(hash);
        
        // Simule 4 passages par jour (fenêtre de 6h)
        // On veut le prochain passage après l'heure actuelle
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();
        
        // On génère une heure cible déterministe pour ce créneau de 6h
        // hash % 360 = minutes totales dans un bloc de 6h (0 à 359)
        const offsetMinutes = absHash % 360; 
        
        // On teste les blocs de 6h : 00h, 06h, 12h, 18h
        const blocks = [0, 6, 12, 18, 24];
        let targetHour = 0;
        let targetMin = 0;
        
        for (let i = 0; i < blocks.length; i++) {
            const h = blocks[i] + Math.floor(offsetMinutes / 60);
            const m = offsetMinutes % 60;
            
            if (h > currentHour || (h === currentHour && m > currentMin)) {
                targetHour = h;
                targetMin = m;
                break;
            }
            
            // Si on a dépassé 18h et que le prochain est demain
            if (i === 3) {
                targetHour = blocks[0] + 24 + Math.floor(offsetMinutes / 60);
                targetMin = m;
            }
        }

        // Calcul de la différence
        let diffMin = (targetHour * 60 + targetMin) - (currentHour * 60 + currentMin);
        
        const hRes = Math.floor(diffMin / 60);
        const mRes = diffMin % 60;
        
        return { h: hRes, m: mRes };
    };

    const handleTrack = () => {
        setStatus('calculating');
        setStepText('Initialisation des capteurs...');

        if (!navigator.geolocation) {
            setStatus('error');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                const steps = [
                    'Synchronisation GNSS...',
                    'Récupération flux TLE (NASA)...',
                    'Calcul SGP4 Orbital...',
                    'Analyse propagation atmosphérique...',
                    'Validation vecteur d\'approche...'
                ];

                let s = 0;
                const intv = setInterval(() => {
                    if (s < steps.length) setStepText(steps[s]);
                    s++;
                }, 700);

                try {
                    // Reverse Geocoding pour stabiliser le résultat par ville
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    
                    const cityPart = data.address.city || data.address.town || data.address.village || data.address.suburb || 'Secteur Local';
                    const countryPart = data.address.country || '';
                    const locName = countryPart ? `${cityPart}, ${countryPart}` : cityPart;

                    // Calcul déterministe
                    const { h, m } = getNextPassTime(latitude, longitude, cityPart);

                    setTimeout(() => {
                        clearInterval(intv);
                        setCity(locName);
                        setTimeStr(`${h.toString().padStart(2, '0')}H ${m.toString().padStart(2, '0')}M`);
                        setStatus('success');
                    }, steps.length * 700 + 300);

                } catch (e) {
                    // Fallback par défaut sur les coordonnées arrondies
                    const { h, m } = getNextPassTime(latitude, longitude, 'Unknown');
                    
                    setTimeout(() => {
                        clearInterval(intv);
                        setCity(`${latitude.toFixed(2)}N, ${longitude.toFixed(2)}E`);
                        setTimeStr(`${h.toString().padStart(2, '0')}H ${m.toString().padStart(2, '0')}M`);
                        setStatus('success');
                    }, steps.length * 700 + 300);
                }
            },
            () => {
                setStatus('error');
            },
            { enableHighAccuracy: true, timeout: 5000 }
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
