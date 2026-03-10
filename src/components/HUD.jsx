import { motion } from 'framer-motion'
import TelemetryWidget from './TelemetryWidget'

export default function HUD({ ready }) {
    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-safe pt-6 pb-3">
                {/* Mission Sophie branding */}
                <div className="flex flex-col">
                    <span
                        className="font-tech text-primary text-[10px] tracking-[0.35em] uppercase"
                        style={{ textShadow: '0 0 10px rgba(0,240,255,0.6)' }}
                    >
                        Mission
                    </span>
                    <span className="font-display text-white text-xl font-bold tracking-wider uppercase leading-tight">
                        Sophie
                    </span>
                </div>

                {/* Live badge */}
                <div className="glass flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-none">
                    <motion.span
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="font-tech text-primary text-[10px] tracking-[0.2em] font-semibold uppercase">
                        ISS Live
                    </span>
                </div>
            </div>

            {/* Telemetry Widget side panel */}
            <TelemetryWidget />

        </motion.div>
    )
}
