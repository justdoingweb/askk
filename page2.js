const hearts = document.getElementById('hearts');
const autoFarm = document.getElementById('autoFarm');
const farmText = document.getElementById('farmText');

let farmCount = 0;
const farmMessages = [
  'คิดถึงเธอ x1 ได้รับ Exp +30',
  'คิดถึงเธอ x2 ระบบเริ่มสงสัยแล้วนะ',
  'คิดถึงเธอ x3 Auto-Farm ทำงานหนักมาก',
  'คิดถึงเธอวนไปจนกว่าเธอจะรู้ตัวแล้ว',
  'Level Up! ความชอบเพิ่มจนเก็บไม่อยู่'
];

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = Math.random() > 0.4 ? '❤' : '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${18 + Math.random() * 26}px`;
  heart.style.animationDuration = `${4.8 + Math.random() * 3.8}s`;
  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

for (let i = 0; i < 18; i += 1) {
  setTimeout(spawnHeart, i * 180);
}

setInterval(spawnHeart, 300);

if (autoFarm && farmText) {
  autoFarm.addEventListener('click', () => {
    farmText.textContent = farmMessages[Math.min(farmCount, farmMessages.length - 1)];
    farmCount += 1;
  });
}
