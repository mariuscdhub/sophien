import { useEffect, useRef } from 'react';

export default function MissionBadge({ name = "ASTRONAUTE", grade = "", className = "w-40 sm:w-56 h-40 sm:h-56" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "/mission_patch.png";

        img.onload = () => {
            // Match canvas coordinates to image pixels for absolute crispness
            canvas.width = img.width;
            canvas.height = img.height;

            // 1. Draw the badge image
            ctx.drawImage(img, 0, 0);

            // 2. Remove pure black background (chroma keying)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // Tolerance for "black" (corners and background)
                if (r < 25 && g < 25 && b < 25) {
                    data[i + 3] = 0; // Make transparent
                }
            }
            ctx.putImageData(imageData, 0, 0);

            // 3. Setup text graphics
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Adjust radius and font size relative to image resolution
            const radius = canvas.width * 0.38; // 38% of canvas width (adjust inner rocker)
            const fontSize = canvas.width * 0.08;

            ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Function to draw text accurately curved
            const drawCurvedText = (text, radius, isTop, color, angleSpanDegrees) => {
                ctx.fillStyle = color;
                ctx.save();
                ctx.translate(centerX, centerY);

                // Convert span to radians
                const angleSpan = (angleSpanDegrees * Math.PI) / 180;

                // Calculate step between letters
                const angleStep = text.length > 1 ? angleSpan / (text.length - 1) : 0;

                // Start tracking from left to right along the arc
                const startAngle = isTop
                    ? -Math.PI / 2 - (angleSpan / 2)
                    : Math.PI / 2 - (angleSpan / 2);

                for (let i = 0; i < text.length; i++) {
                    ctx.save();
                    const currentAngle = startAngle + i * angleStep;

                    // Rotate to the letter position
                    ctx.rotate(currentAngle);

                    // Move out to the radius ring
                    ctx.translate(0, isTop ? -radius : radius);

                    // Keep text standing up relative to user reading
                    if (!isTop) {
                        ctx.rotate(Math.PI);
                    }

                    ctx.fillText(text[i], 0, 0);
                    ctx.restore();
                }
                ctx.restore();
            };

            // Draw Top arc (Mission name) in amber/orange
            drawCurvedText("MISSION SOPHIE", radius * 1.05, true, "#ffbf00", 60);

            // Draw Bottom arc (User Name) in cyan
            // Use fallback name if empty
            const safeName = (name || "INCONNU").toUpperCase();
            // Dynamically adjust span based on name length to avoid overlapping
            const spanLength = Math.min(100, Math.max(40, safeName.length * 8));
            drawCurvedText(safeName, radius * 1.02, false, "#00FFFF", spanLength);

            // Draw User Grade
            if (grade) {
                const safeGrade = grade.toUpperCase();
                ctx.font = `bold ${fontSize * 0.7}px "JetBrains Mono", monospace`;
                const gradeSpanLength = Math.min(90, Math.max(30, safeGrade.length * 6));
                drawCurvedText(safeGrade, radius * 0.85, false, "#FFFFFF", gradeSpanLength);
            }
        };
    }, [name, grade]);

    return (
        <canvas
            id="mission-badge-canvas"
            ref={canvasRef}
            className={`max-w-full drop-shadow-[0_10px_30px_rgba(0,240,255,0.3)] ${className}`}
        />
    );
}
