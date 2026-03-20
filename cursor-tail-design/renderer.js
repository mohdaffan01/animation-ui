const { ipcRenderer } = require('electron');

const particlesContainer = document.getElementById('particles');

let lastX = null;
let lastY = null;

ipcRenderer.on('mouse-move', (event, { x, y }) => {
  if (lastX === null && lastY === null) {
    lastX = x;
    lastY = y;
    return;
  }

  // Only draw segment if coordinates have changed
  if (x !== lastX || y !== lastY) {
    const startX = lastX;
    const startY = lastY;
    const endX = x;
    const endY = y;
    
    // Update immediately so subsequent messages don't reuse the old point
    lastX = x;
    lastY = y;

    // Use requestAnimationFrame for smooth DOM updates
    requestAnimationFrame(() => {
      createSegment(startX, startY, endX, endY);
    });
  }
});

function createSegment(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate the angle in degrees
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // Calculate the center point of the segment
  const cx = x1 + dx / 2;
  const cy = y1 + dy / 2;

  const segment = document.createElement('div');
  segment.className = 'particle-segment';
  
  // The line thickness is 4px. Adding 4px to distance covers the rounded ends perfectly.
  segment.style.width = (distance + 4) + 'px';
  segment.style.height = '2px';
  
  // Position the center of the segment at cx, cy
  segment.style.left = cx + 'px';
  segment.style.top = cy + 'px';
  // Use independent CSS properties so we can animate 'scale' in CSS without overriding rotation
  segment.style.translate = '-50% -50%';
  segment.style.rotate = `${angle}deg`;
  
  particlesContainer.appendChild(segment);

  // Optimization: memory leak prevention, short 1s lifespan
  setTimeout(() => {
    segment.remove();
  }, 1000);
}
