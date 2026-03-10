import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function PanoramaScene() {
    // We use the newly loaded image that was requested
    const texture = useTexture('/cupola.jpg');

    return (
        <>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={-0.5} // Inverted rotation for inside sphere feel
                autoRotate
                autoRotateSpeed={0.5}
            />
            <Sphere args={[500, 60, 40]}>
                <meshBasicMaterial
                    map={texture}
                    side={THREE.BackSide}
                />
            </Sphere>
        </>
    );
}

export default function PanoramaViewer({ visible, onClose }) {
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
                    <div className="w-full h-full cursor-grab active:cursor-grabbing">
                        <Canvas camera={{ position: [0, 0, 0.1], fov: 90 }}>
                            <Suspense fallback={null}>
                                <PanoramaScene />
                            </Suspense>
                        </Canvas>
                    </div>

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

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-white/50 text-[10px] tracking-widest font-tech uppercase">
                        Glissez pour explorer
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
