import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ISSScene from './components/ISSScene'
import Loader from './components/Loader'
import HUD from './components/HUD'
import HotspotOverlay from './components/HotspotOverlay'
import Modal from './components/Modal'
import IntroScreen from './components/IntroScreen'
import TimelinePanel from './components/TimelinePanel'
import InfoPanel from './components/InfoPanel'
import BottomNav from './components/BottomNav'
import PanoramaViewer from './components/PanoramaViewer'
import BadgeModal from './components/BadgeModal'
import MissionReadinessTest from './components/MissionReadinessTest'

export default function App() {
    // === App flow states ===
    const [phase, setPhase] = useState('intro')   // 'intro' | 'loading' | 'ready'
    const [crewName, setCrewName] = useState('')
    const [grade, setGrade] = useState('')
    const [activeHotspot, setActiveHotspot] = useState(null)
    const [showTimeline, setShowTimeline] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showPanorama, setShowPanorama] = useState(false)
    const [badgeReady, setBadgeReady] = useState(false)
    const [showBadgeModal, setShowBadgeModal] = useState(false)
    const [showMRT, setShowMRT] = useState(false)

    const handleEnterScene = useCallback((name) => {
        setCrewName(name)
        setPhase('loading')
    }, [])

    const handleModelLoaded = useCallback(() => {
        setTimeout(() => setPhase('ready'), 800)
    }, [])

    const handleMRTComplete = useCallback((achievedGrade) => {
        setGrade(achievedGrade)
        setShowMRT(false)
        setBadgeReady(true)
        setShowBadgeModal(true)
    }, [])

    const handleHotspotClick = useCallback((hotspot) => {
        setActiveHotspot(hotspot)
    }, [])

    const handleModalClose = useCallback(() => {
        setActiveHotspot(null)
    }, [])

    return (
        <div className="fixed inset-0 overflow-hidden" style={{ background: '#050B14' }}>
            {/* No space background */}

            {/* 3D Canvas — mounted when past intro so GLB preloads during intro */}
            <AnimatePresence>
                {phase !== 'intro' && (
                    <motion.div
                        key="canvas"
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <ISSScene onLoaded={handleModelLoaded} onHotspotClick={handleHotspotClick} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === INTRO SCREEN === */}
            <AnimatePresence>
                {phase === 'intro' && (
                    <motion.div
                        key="intro"
                        className="absolute inset-0 z-50"
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                    >
                        <IntroScreen onEnter={handleEnterScene} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === LOADER === */}
            <Loader visible={phase === 'loading'} />

            {/* === SCENE UI (only when ready) === */}
            {/* HUD */}
            <HUD
                ready={phase === 'ready'}
                badgeReady={badgeReady}
                onOpenBadge={() => setShowBadgeModal(true)}
                onOpenMRT={() => setShowMRT(true)}
            />

            {/* Bottom nav */}
            <BottomNav
                ready={phase === 'ready'}
                onTimeline={() => setShowTimeline(true)}
                onInfo={() => setShowInfo(true)}
                onOpenPanorama={() => setShowPanorama(true)}
            />

            {/* === MODALS === */}
            {/* Hotspot detail modal */}
            <Modal hotspot={activeHotspot} onClose={handleModalClose} />

            {/* Timeline panel */}
            <TimelinePanel
                visible={showTimeline}
                onClose={() => setShowTimeline(false)}
            />

            {/* Info panel */}
            <InfoPanel
                visible={showInfo}
                onClose={() => setShowInfo(false)}
            />

            {/* 360 Panorama Viewer */}
            <PanoramaViewer
                visible={showPanorama}
                onClose={() => setShowPanorama(false)}
            />

            {/* Badge Generation ready modal */}
            <BadgeModal
                visible={showBadgeModal}
                crewName={crewName}
                grade={grade}
                onClose={() => setShowBadgeModal(false)}
            />

            {/* Mission Readiness Test */}
            {showMRT && (
                <MissionReadinessTest
                    onClose={() => setShowMRT(false)}
                    onComplete={handleMRTComplete}
                />
            )}
        </div>
    )
}

/* ─── Galaxy Background ─────────────────────────────────────────────── */
// Handled by Galaxy component imported above
