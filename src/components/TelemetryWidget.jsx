import { motion } from 'framer-motion';

export default function TelemetryWidget() {
    const bars = [
        { label: 'O2 Level', defaultWidth: 85, duration: 2 },
        { label: 'Power Grid', defaultWidth: 92, duration: 3 },
        { label: 'Thermal Shield', defaultWidth: 78, duration: 2.5 },
    ];

    return (
        <div 
            className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-5 p-4 bg-black border-l border-y border-[#00FFFF]"
            style={{ 
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: '-5px 0 20px rgba(0,255,255,0.15)',
                clipPath: 'polygon(0 10px, 10px 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#00FFFF]/30 pb-2 mb-2">
                <span className="text-[#00FFFF] text-[10px] uppercase tracking-widest">SYS.DATA</span>
                <div className="flex gap-1">
                    <div className="w-1 h-3 bg-[#00FFFF] animate-pulse"></div>
                    <div className="w-1 h-3 bg-[#00FFFF]/50"></div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="flex flex-col gap-4">
                {bars.map((bar, i) => (
                    <div key={i} className="flex flex-col gap-1 w-32">
                        <div className="flex justify-between items-center text-[#00FFFF] text-[10px]">
                            <span className="uppercase">{bar.label}</span>
                        </div>
                        <div className="h-[2px] w-full bg-[#00FFFF]/20 relative">
                            <motion.div 
                                className="absolute top-0 left-0 h-full bg-[#00FFFF]"
                                style={{ boxShadow: '0 0 5px rgba(0,255,255,0.8)' }}
                                animate={{ 
                                    width: [`${bar.defaultWidth - 10}%`, `${bar.defaultWidth}%`, `${bar.defaultWidth - 5}%`] 
                                }}
                                transition={{ 
                                    duration: bar.duration, 
                                    repeat: Infinity, 
                                    repeatType: "reverse", 
                                    ease: "easeInOut" 
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Micro Buttons */}
            <div className="flex gap-2 mt-2 pt-3 border-t border-[#00FFFF]/30 justify-between">
                {[1, 2, 3].map((btn) => (
                    <button 
                        key={btn}
                        className="w-6 h-6 border border-[#00FFFF]/50 bg-[#00FFFF]/10 flex items-center justify-center hover:bg-[#00FFFF]/30 transition-colors"
                    >
                        {/* Generic Electric Sensor Icon */}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="square">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}
