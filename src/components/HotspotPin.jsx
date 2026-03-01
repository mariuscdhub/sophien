import { motion } from 'framer-motion'

export default function HotspotPin({ hotspot, onClick }) {
    return (
        <div
            className="group absolute flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
            style={{ top: hotspot.position.top, left: hotspot.position.left, transform: 'translate(-50%, -50%)' }}
            onClick={() => onClick(hotspot)}
        >
            {/* Hover area wrapper */}
            <div className="relative w-12 h-12 flex items-center justify-center pt-2">
                {/* Outer ping ring */}
                <motion.div
                    className="absolute rounded-full border border-primary pointer-events-none w-3 h-3"
                    animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />

                {/* Main minimalist dot */}
                <motion.div
                    className="relative w-3 h-3 rounded-full bg-white"
                    style={{
                        boxShadow: '0 0 10px rgba(0,240,255,0.8), 0 0 20px rgba(255,255,255,0.6)',
                    }}
                    whileHover={{ scale: 1.5, bg: '#00F0FF' }}
                    whileTap={{ scale: 0.8 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
            </div>

            {/* Label tag (Hidden by default, shown on hover/group-hover) */}
            <motion.div
                className="absolute top-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ y: 0 }}
                whileInView={{ y: 5 }}
            >
                <div
                    className="flex flex-col items-center"
                >
                    <span
                        className="font-tech text-white text-[10px] tracking-widest font-semibold px-2 py-1 rounded shadow-lg"
                        style={{
                            background: 'rgba(5, 11, 20, 0.8)',
                            border: '1px solid rgba(0,240,255,0.3)',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        {hotspot.label}
                    </span>
                </div>
            </motion.div>
        </div>
    )
}
