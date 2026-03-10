import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PanoramaViewer({ visible, onClose }) {
    const containerRef = useRef(null);

    useEffect(() => {
        let viewer = null;
        if (visible && window.pannellum) {
            // Need a tiny delay for the AnimatePresence to mount the div into DOM completely
            const timer = setTimeout(() => {
                if (containerRef.current) {
                    viewer = window.pannellum.viewer(containerRef.current, {
                        "type": "equirectangular",
                        "panorama": "/cupola-view.jpg",
                        "autoLoad": true,
                        "compass": true,
                        "hfov": 110,
                        "autoRotate": -1,
                    });
                }
            }, 100);

            return () => {
                clearTimeout(timer);
                if (viewer && typeof viewer.destroy === 'function') {
                    viewer.destroy();
                }
            };
        }
    }, [visible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[1000] bg-black pointer-events-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div ref={containerRef} className="w-full h-full" />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-[1001] px-6 py-2.5 font-bold text-[#00FFFF] uppercase tracking-[0.15em] transition-all duration-300 pointer-events-auto"
                        style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid #00FFFF',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#00FFFF';
                            e.target.style.color = '#000';
                            e.target.style.boxShadow = '0 0 15px #00FFFF';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(0, 0, 0, 0.6)';
                            e.target.style.color = '#00FFFF';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        RETOUR STATION
                    </button>

                    <div className="absolute top-6 left-6 pointer-events-none z-[1001]">
                        <span className="text-[#00FFFF] text-[10px] tracking-[0.3em] uppercase font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            NODE 3 / CUPOLA
                        </span>
                        <div className="text-white text-xl mt-1 tracking-widest font-bold uppercase font-display drop-shadow-md">
                            Vue Intérieure 360°
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
