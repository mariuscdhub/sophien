import { Suspense, useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, useProgress, Environment, Html, Center } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { HOTSPOTS } from '../data/hotspots'
import HotspotPin from './HotspotPin'

function ISSModel({ onLoaded, onHotspotClick }) {
    const { scene } = useGLTF('/iss.glb')
    const groupRef = useRef()
    const hotspotsRef = useRef()
    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        const box = new THREE.Box3().setFromObject(scene)
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        if (groupRef.current) {
            const targetScale = 15 / maxDim
            groupRef.current.scale.set(targetScale, targetScale, targetScale)
        }

        if (onLoaded) onLoaded()
        const t = setTimeout(() => setOpacity(1), 100)
        return () => clearTimeout(t)
    }, [onLoaded, scene])


    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0008
        }
        if (hotspotsRef.current) {
            hotspotsRef.current.rotation.y += 0.0008
        }
    })

    return (
        <>
            <group ref={groupRef}>
                <Center top>
                    <primitive
                        object={scene}
                    />
                </Center>
            </group>

            <group ref={hotspotsRef}>
                {HOTSPOTS.map((hotspot) => (
                    <Html key={hotspot.id} position={hotspot.position} center distanceFactor={15} zIndexRange={[100, 0]}>
                        <HotspotPin hotspot={hotspot} onClick={() => onHotspotClick(hotspot)} />
                    </Html>
                ))}
            </group>
        </>
    )
}

export default function ISSScene({ onLoaded, onHotspotClick }) {
    return (
        <Canvas
            camera={{ position: [0, 2, 25], fov: 45 }}
            gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
            dpr={1} // Lock pixel ratio mathematically to 1 for max performance
            style={{ background: '#050B14' }}
        >
            {/* Lighting to simulate space sun on solar panels */}
            <ambientLight intensity={0.4} color="#b0c4de" />
            <directionalLight
                position={[15, 10, 8]}
                intensity={3.5}
                color="#fff5e0"
                castShadow
            />
            <directionalLight
                position={[-10, 5, -8]}
                intensity={1.2}
                color="#4080cc"
            />
            <pointLight position={[0, -5, 5]} intensity={0.6} color="#00F0FF" />

            <Suspense fallback={null}>
                <ISSModel onLoaded={onLoaded} onHotspotClick={onHotspotClick} />
            </Suspense>

            <OrbitControls
                makeDefault
                autoRotate={false}
                enablePan={false}
                enableZoom={true}
                minDistance={10}
                maxDistance={40}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI * 0.75}
                rotateSpeed={0.5}
                zoomSpeed={0.5}
            />
        </Canvas>
    )
}

useGLTF.preload('/iss.glb')
