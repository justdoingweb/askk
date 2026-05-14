const matrixCanvas = document.getElementById('matrixCanvas');

if (matrixCanvas) {
  const ctx = matrixCanvas.getContext('2d');
  const fontSize = 10;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let width = 0;
  let height = 0;
  let columns = 0;
  let drops = [];
  let speeds = [];

  const resizeMatrix = () => {
    width = matrixCanvas.width = window.innerWidth;
    height = matrixCanvas.height = window.innerHeight;
    columns = Math.max(1, Math.floor(width / fontSize));
    drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
    speeds = Array.from({ length: columns }, () => 0.25 + Math.random() * 0.7);
  };

  const drawMatrix = () => {
    ctx.fillStyle = 'rgba(8, 0, 16, 0.28)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px "Consolas", "Courier New", monospace`;
    ctx.textBaseline = 'top';

    for (let i = 0; i < drops.length; i += 1) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      for (let trail = 0; trail < 24; trail += 1) {
        const set = trail % 2 === 0 ? letters : numbers;
        const char = set.charAt(Math.floor(Math.random() * set.length));
        const alpha = Math.max(0.04, 1 - trail * 0.05);
        ctx.shadowColor = 'rgba(255, 105, 180, 0.55)';
        ctx.shadowBlur = trail === 0 ? 12 : 4;
        ctx.fillStyle = trail === 0
          ? 'rgba(255, 170, 220, 0.95)'
          : `rgba(255, 90, 170, ${alpha})`;
        ctx.fillText(char, x, y - trail * fontSize);
      }

      ctx.shadowBlur = 0;

      if (y > height + fontSize * 24 && Math.random() > 0.985) {
        drops[i] = 0;
      }

      drops[i] += speeds[i];
    }

    requestAnimationFrame(drawMatrix);
  };

  resizeMatrix();
  window.addEventListener('resize', resizeMatrix);
  requestAnimationFrame(drawMatrix);
}
