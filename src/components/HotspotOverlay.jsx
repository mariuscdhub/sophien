import { motion, AnimatePresence } from 'framer-motion'
import { HOTSPOTS } from '../data/hotspots'
import HotspotPin from './HotspotPin'

export default function HotspotOverlay({ onHotspotClick, ready }) {
    return (
        <AnimatePresence>
            {ready && (
                <motion.div
                    key="hotspots"
                    className="absolute inset-0 z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    {/* Re-enable pointer events only on the hotspot pins */}
                    <div className="relative w-full h-full pointer-events-auto">
                        {HOTSPOTS.map((hotspot) => (
                            <HotspotPin
                                key={hotspot.id}
                                hotspot={hotspot}
                                onClick={onHotspotClick}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
